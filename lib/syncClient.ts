import {
  getRoutineSlots,
  registerRoutinesCloudPush,
} from "./customRoutines";
import type { RoutineId } from "./routines";
import { getSessions, registerStorageCloudPush } from "./storage";
import { getStretchDays, registerStretchDaysCloudPush } from "./stretchDays";
import type { CloudSyncPayload, CloudSyncResponse } from "./syncTypes";
import type { SessionRecord } from "./storage";

const ROUTINE_IDS: RoutineId[] = ["monday", "wednesday", "friday"];

const SESSIONS_KEY = "stretchy-sessions";
const ROUTINES_KEY = "stretchy-custom-routines";
const DAYS_KEY = "stretchy-stretch-days";

let cloudSyncActive = false;
let hydrating = false;
let pendingPush = false;
let pushTimeout: ReturnType<typeof setTimeout> | null = null;

type CloudPushHook = (immediate?: boolean) => void;
const cloudPushHooks: CloudPushHook[] = [];

export function registerCloudPushHook(hook: CloudPushHook): void {
  cloudPushHooks.push(hook);
}

export function activateCloudSync(): void {
  cloudSyncActive = true;
}

export function deactivateCloudSync(): void {
  cloudSyncActive = false;
}

export function notifyDataUpdated(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("stretchy-data-updated"));
}

function scheduleCloudPush(immediate = false): void {
  if (!cloudSyncActive || typeof window === "undefined") return;

  if (hydrating) {
    pendingPush = true;
    return;
  }

  if (immediate) {
    if (pushTimeout) clearTimeout(pushTimeout);
    pushTimeout = null;
    void pushLocalToCloud();
    return;
  }

  if (pushTimeout) clearTimeout(pushTimeout);
  pushTimeout = setTimeout(() => {
    void pushLocalToCloud();
  }, 700);
}

export function registerCloudPushOnSave(): void {
  registerCloudPushHook(scheduleCloudPush);
  registerStorageCloudPush(() => scheduleCloudPush(false));
  registerRoutinesCloudPush(() => scheduleCloudPush(true));
  registerStretchDaysCloudPush(() => scheduleCloudPush(false));
}

export function collectLocalPayload(): CloudSyncPayload {
  return {
    stretchDays: getStretchDays(),
    routines: {
      monday: getRoutineSlots("monday"),
      wednesday: getRoutineSlots("wednesday"),
      friday: getRoutineSlots("friday"),
    },
    sessions: getSessions(),
  };
}

export function applyCloudPayload(payload: CloudSyncPayload): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(DAYS_KEY, JSON.stringify(payload.stretchDays));
  localStorage.setItem(
    ROUTINES_KEY,
    JSON.stringify({
      monday: payload.routines.monday,
      wednesday: payload.routines.wednesday,
      friday: payload.routines.friday,
    })
  );
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(payload.sessions));
  notifyDataUpdated();
}

function countFilledSlots(slots: (string | null)[] | undefined): number {
  return (slots ?? []).filter((slot) => slot !== null).length;
}

function mergeRoutineSlots(
  local: (string | null)[],
  server: (string | null)[]
): (string | null)[] {
  const localFilled = countFilledSlots(local);
  const serverFilled = countFilledSlots(server);

  if (serverFilled === 0) return local;
  if (localFilled === 0) return server;
  return server;
}

function mergeSessions(
  local: SessionRecord[],
  server: SessionRecord[]
): SessionRecord[] {
  const byDate = new Map<string, SessionRecord>();

  for (const session of local) {
    byDate.set(session.date, session);
  }

  for (const session of server) {
    const existing = byDate.get(session.date);
    if (
      !existing ||
      new Date(session.completedAt).getTime() >
        new Date(existing.completedAt).getTime()
    ) {
      byDate.set(session.date, session);
    }
  }

  return Array.from(byDate.values()).sort((a, b) => b.date.localeCompare(a.date));
}

function mergePayloads(
  local: CloudSyncPayload,
  server: CloudSyncResponse
): CloudSyncPayload {
  const routines = {} as Record<RoutineId, (string | null)[]>;

  for (const id of ROUTINE_IDS) {
    routines[id] = mergeRoutineSlots(local.routines[id], server.routines[id]);
  }

  return {
    stretchDays: server.stretchDays,
    routines,
    sessions: mergeSessions(local.sessions, server.sessions),
  };
}

function payloadsDiffer(a: CloudSyncPayload, b: CloudSyncPayload): boolean {
  return JSON.stringify(a) !== JSON.stringify(b);
}

async function pushPayloadToCloud(payload: CloudSyncPayload): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    const res = await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return false;

    const data = (await res.json()) as CloudSyncResponse;
    applyCloudPayload(data);
    return true;
  } catch {
    return false;
  }
}

export async function pushLocalToCloud(): Promise<boolean> {
  return pushPayloadToCloud(collectLocalPayload());
}

export async function hydrateFromCloud(): Promise<
  "server" | "uploaded" | "offline"
> {
  hydrating = true;
  pendingPush = false;

  try {
    const local = collectLocalPayload();
    const res = await fetch("/api/sync");
    if (!res.ok) return "offline";

    const server = (await res.json()) as CloudSyncResponse;

    if (!server.hasServerData) {
      const uploaded = await pushPayloadToCloud(local);
      return uploaded ? "uploaded" : "offline";
    }

    const merged = mergePayloads(local, server);
    applyCloudPayload(merged);

    if (payloadsDiffer(merged, server)) {
      await pushPayloadToCloud(merged);
    }

    return "server";
  } catch {
    return "offline";
  } finally {
    hydrating = false;
    activateCloudSync();

    if (pendingPush) {
      pendingPush = false;
      void pushLocalToCloud();
    }
  }
}

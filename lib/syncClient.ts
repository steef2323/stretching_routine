import {
  getRoutineSlots,
  registerRoutinesCloudPush,
} from "./customRoutines";
import type { RoutineId } from "./routines";
import { getSessions, registerStorageCloudPush } from "./storage";
import { getStretchDays, registerStretchDaysCloudPush } from "./stretchDays";
import type { CloudSyncPayload, CloudSyncResponse } from "./syncTypes";

const ROUTINE_IDS: RoutineId[] = ["monday", "wednesday", "friday"];

const SESSIONS_KEY = "stretchy-sessions";
const ROUTINES_KEY = "stretchy-custom-routines";
const DAYS_KEY = "stretchy-stretch-days";

let cloudSyncActive = false;
let pushTimeout: ReturnType<typeof setTimeout> | null = null;

type CloudPushHook = () => void;
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

function scheduleCloudPush(): void {
  if (!cloudSyncActive || typeof window === "undefined") return;

  if (pushTimeout) clearTimeout(pushTimeout);
  pushTimeout = setTimeout(() => {
    void pushLocalToCloud();
  }, 700);
}

export function registerCloudPushOnSave(): void {
  registerCloudPushHook(scheduleCloudPush);
  registerStorageCloudPush(scheduleCloudPush);
  registerRoutinesCloudPush(scheduleCloudPush);
  registerStretchDaysCloudPush(scheduleCloudPush);
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
  const hasRoutineData = ROUTINE_IDS.some((id) =>
    payload.routines[id]?.some((slot) => slot !== null)
  );

  if (hasRoutineData) {
    localStorage.setItem(
      ROUTINES_KEY,
      JSON.stringify({
        monday: payload.routines.monday,
        wednesday: payload.routines.wednesday,
        friday: payload.routines.friday,
      })
    );
  }
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(payload.sessions));
  notifyDataUpdated();
}

export async function pushLocalToCloud(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    const res = await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collectLocalPayload()),
    });

    if (!res.ok) return false;

    const data = (await res.json()) as CloudSyncResponse;
    deactivateCloudSync();
    applyCloudPayload(data);
    activateCloudSync();
    return true;
  } catch {
    return false;
  }
}

export async function hydrateFromCloud(): Promise<
  "server" | "uploaded" | "offline"
> {
  deactivateCloudSync();

  try {
    const res = await fetch("/api/sync");
    if (!res.ok) return "offline";

    const data = (await res.json()) as CloudSyncResponse;

    if (data.hasServerData) {
      applyCloudPayload(data);
      return "server";
    }

    const uploaded = await pushLocalToCloud();
    return uploaded ? "uploaded" : "offline";
  } catch {
    return "offline";
  } finally {
    activateCloudSync();
  }
}

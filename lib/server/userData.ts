import { DEFAULT_STRETCH_DAYS } from "../stretchDays";
import type { CloudSyncPayload, CloudSyncResponse } from "../syncTypes";
import type { RoutineId } from "../routines";
import type { SessionRecord } from "../storage";
import { ensureSchema, getSql } from "./db";

const ROUTINE_IDS: RoutineId[] = ["monday", "wednesday", "friday"];

export async function fetchUserData(userId: string): Promise<CloudSyncResponse> {
  await ensureSchema();
  const sql = getSql();

  const settingsRows = await sql`
    SELECT stretch_days FROM user_settings WHERE user_id = ${userId}
  `;

  const routineRows = await sql`
    SELECT routine_id, slots FROM user_routines WHERE user_id = ${userId}
  `;

  const sessionRows = await sql`
    SELECT session_date, routine_id, is_scheduled_day, completed_at
    FROM stretch_sessions
    WHERE user_id = ${userId}
    ORDER BY session_date DESC
  `;

  const hasServerData =
    settingsRows.length > 0 ||
    routineRows.length > 0 ||
    sessionRows.length > 0;

  const stretchDays =
    settingsRows.length > 0
      ? parseStretchDays(settingsRows[0].stretch_days)
      : [...DEFAULT_STRETCH_DAYS];

  const routines: Partial<Record<RoutineId, (string | null)[]>> = {};

  for (const row of routineRows) {
    const id = row.routine_id as RoutineId;
    if (ROUTINE_IDS.includes(id)) {
      routines[id] = parseSlots(row.slots);
    }
  }

  const sessions: SessionRecord[] = sessionRows.map((row) => ({
    date: String(row.session_date),
    routineId: row.routine_id as RoutineId,
    isScheduledDay: Boolean(row.is_scheduled_day),
    completedAt: new Date(row.completed_at as string).toISOString(),
  }));

  return {
    hasServerData,
    stretchDays,
    routines: {
      monday: routines.monday ?? defaultSlots(),
      wednesday: routines.wednesday ?? defaultSlots(),
      friday: routines.friday ?? defaultSlots(),
    },
    sessions,
  };
}

export async function saveUserData(
  userId: string,
  payload: CloudSyncPayload
): Promise<void> {
  await ensureSchema();
  const sql = getSql();

  const stretchDaysJson = JSON.stringify(payload.stretchDays);

  await sql`
    INSERT INTO user_settings (user_id, stretch_days, updated_at)
    VALUES (${userId}, ${stretchDaysJson}::jsonb, NOW())
    ON CONFLICT (user_id)
    DO UPDATE SET
      stretch_days = EXCLUDED.stretch_days,
      updated_at = NOW()
  `;

  for (const routineId of ROUTINE_IDS) {
    const slots = normalizeSlots(payload.routines[routineId] ?? defaultSlots());
    const slotsJson = JSON.stringify(slots);

    await sql`
      INSERT INTO user_routines (user_id, routine_id, slots, updated_at)
      VALUES (${userId}, ${routineId}, ${slotsJson}::jsonb, NOW())
      ON CONFLICT (user_id, routine_id)
      DO UPDATE SET
        slots = EXCLUDED.slots,
        updated_at = NOW()
    `;
  }

  for (const session of payload.sessions) {
    await sql`
      INSERT INTO stretch_sessions (
        user_id,
        session_date,
        routine_id,
        is_scheduled_day,
        completed_at
      )
      VALUES (
        ${userId},
        ${session.date},
        ${session.routineId},
        ${session.isScheduledDay},
        ${session.completedAt}
      )
      ON CONFLICT (user_id, session_date)
      DO UPDATE SET
        routine_id = EXCLUDED.routine_id,
        is_scheduled_day = EXCLUDED.is_scheduled_day,
        completed_at = EXCLUDED.completed_at
    `;
  }
}

function defaultSlots(): (string | null)[] {
  return [null, null, null, null, null];
}

function parseStretchDays(value: unknown): number[] {
  if (Array.isArray(value)) {
    const days = value.filter((day): day is number => typeof day === "number");
    return days.length > 0 ? days : [...DEFAULT_STRETCH_DAYS];
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      if (Array.isArray(parsed)) {
        const days = parsed.filter((day): day is number => typeof day === "number");
        return days.length > 0 ? days : [...DEFAULT_STRETCH_DAYS];
      }
    } catch {
      return [...DEFAULT_STRETCH_DAYS];
    }
  }

  return [...DEFAULT_STRETCH_DAYS];
}

function parseSlots(value: unknown): (string | null)[] {
  if (Array.isArray(value)) {
    return normalizeSlots(value as (string | null)[]);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      if (Array.isArray(parsed)) {
        return normalizeSlots(parsed as (string | null)[]);
      }
    } catch {
      return defaultSlots();
    }
  }

  return defaultSlots();
}

function normalizeSlots(slots: (string | null)[]): (string | null)[] {
  const copy = [...slots];
  while (copy.length < 5) copy.push(null);
  return copy.slice(0, 5);
}

import type { RoutineId } from "./routines";
import { formatLocalDate, isSameLocalDay } from "./schedule";
import { getStretchDays } from "./stretchDays";

const cloudPushHooks: Array<() => void> = [];

export function registerStorageCloudPush(hook: () => void): void {
  cloudPushHooks.push(hook);
}

function notifyCloudPush(): void {
  cloudPushHooks.forEach((hook) => hook());
}

export interface SessionRecord {
  date: string;
  routineId: RoutineId;
  isScheduledDay: boolean;
  completedAt: string;
}

const STORAGE_KEY = "stretchy-sessions";

function readSessions(): SessionRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SessionRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSessions(sessions: SessionRecord[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function saveSession(
  routineId: RoutineId,
  date: Date = new Date()
): SessionRecord {
  const stretchDays = new Set(getStretchDays());
  const record: SessionRecord = {
    date: formatLocalDate(date),
    routineId,
    isScheduledDay: stretchDays.has(date.getDay()),
    completedAt: date.toISOString(),
  };

  const sessions = readSessions().filter((s) => s.date !== record.date);
  sessions.push(record);
  writeSessions(sessions);
  notifyCloudPush();

  return record;
}

export function getSessions(): SessionRecord[] {
  return readSessions();
}

export function getSessionsForMonth(year: number, month: number): SessionRecord[] {
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  return readSessions().filter((s) => s.date.startsWith(prefix));
}

export function getCompletedDates(): Set<string> {
  return new Set(readSessions().map((s) => s.date));
}

export function getScheduledCompletedDates(): Set<string> {
  return new Set(
    readSessions().filter((s) => s.isScheduledDay).map((s) => s.date)
  );
}

export function calculateCurrentStreak(now: Date = new Date()): number {
  const completed = getScheduledCompletedDates();
  const stretchDays = new Set(getStretchDays());
  const cursor = new Date(now);
  cursor.setHours(12, 0, 0, 0);

  let streak = 0;

  for (let i = 0; i < 730; i++) {
    const dow = cursor.getDay();

    if (stretchDays.has(dow)) {
      const key = formatLocalDate(cursor);

      if (completed.has(key)) {
        streak++;
      } else if (isSameLocalDay(cursor, now)) {
        // Today is a stretch day but not done yet — don't break the streak
      } else {
        break;
      }
    }

    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function calculateLongestStreak(): number {
  const completed = [...getScheduledCompletedDates()].sort();
  if (completed.length === 0) return 0;

  let longest = 0;
  let current = 0;
  let prevDate: Date | null = null;

  for (const dateStr of completed) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d, 12, 0, 0, 0);

    if (prevDate && isNextScheduledDay(prevDate, date)) {
      current++;
    } else {
      current = 1;
    }

    longest = Math.max(longest, current);
    prevDate = date;
  }

  return longest;
}

function isNextScheduledDay(prev: Date, next: Date): boolean {
  const stretchDays = new Set(getStretchDays());
  const cursor = new Date(prev);
  cursor.setDate(cursor.getDate() + 1);

  while (cursor <= next) {
    if (stretchDays.has(cursor.getDay())) {
      return formatLocalDate(cursor) === formatLocalDate(next);
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return false;
}

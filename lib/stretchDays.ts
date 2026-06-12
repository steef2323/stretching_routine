export const DEFAULT_STRETCH_DAYS = [1, 3, 5] as const; // Mon, Wed, Fri
export const OPTIMAL_DAYS_PER_WEEK = 3;

const STORAGE_KEY = "stretchy-stretch-days";

const cloudPushHooks: Array<() => void> = [];

export function registerStretchDaysCloudPush(hook: () => void): void {
  cloudPushHooks.push(hook);
}

function notifyCloudPush(): void {
  cloudPushHooks.forEach((hook) => hook());
}

export const WEEKDAY_OPTIONS = [
  { dow: 1, label: "Monday" },
  { dow: 2, label: "Tuesday" },
  { dow: 3, label: "Wednesday" },
  { dow: 4, label: "Thursday" },
  { dow: 5, label: "Friday" },
  { dow: 6, label: "Saturday" },
  { dow: 0, label: "Sunday" },
] as const;

function normalizeDays(days: number[]): number[] {
  const unique = [...new Set(days.filter((d) => d >= 0 && d <= 6))];
  unique.sort((a, b) => {
    const order = (d: number) => (d === 0 ? 7 : d);
    return order(a) - order(b);
  });
  return unique;
}

function readStretchDays(): number[] | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as number[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return normalizeDays(parsed);
  } catch {
    return null;
  }
}

function writeStretchDays(days: number[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeDays(days)));
}

export function getStretchDays(): number[] {
  return readStretchDays() ?? [...DEFAULT_STRETCH_DAYS];
}

export function saveStretchDays(days: number[]): void {
  const normalized = normalizeDays(days);
  if (normalized.length === 0) return;
  writeStretchDays(normalized);
  notifyCloudPush();
}

export function isDayStretchDay(dayOfWeek: number, days?: number[]): boolean {
  const stretchDays = days ?? getStretchDays();
  return stretchDays.includes(dayOfWeek);
}

export function shouldWarnOnAdd(currentCount: number): boolean {
  return currentCount >= OPTIMAL_DAYS_PER_WEEK;
}

export function shouldWarnOnRemove(): boolean {
  return true;
}

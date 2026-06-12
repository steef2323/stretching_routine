import type { RoutineId } from "./routines";
import { DEFAULT_STRETCH_DAYS, getStretchDays } from "./stretchDays";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export function isStretchDay(date: Date = new Date()): boolean {
  const stretchDays =
    typeof window === "undefined" ? [...DEFAULT_STRETCH_DAYS] : getStretchDays();
  return stretchDays.includes(date.getDay());
}

export function getRoutineIdForDate(date: Date = new Date()): RoutineId {
  const day = date.getDay();

  switch (day) {
    case 1:
      return "monday";
    case 3:
      return "wednesday";
    case 5:
      return "friday";
    case 2:
      return "monday";
    case 4:
      return "wednesday";
    case 0:
    case 6:
      return "friday";
    default:
      return "monday";
  }
}

export function getTimeOfDay(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

export function getGreeting(date: Date = new Date()): string {
  const dayName = DAY_NAMES[date.getDay()];
  const timeOfDay = getTimeOfDay(date);
  return `Happy ${dayName} ${timeOfDay}`;
}

export function formatLocalDate(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isSameLocalDay(a: Date, b: Date): boolean {
  return formatLocalDate(a) === formatLocalDate(b);
}

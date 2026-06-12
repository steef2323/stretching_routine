import { getExerciseById } from "./exercises";
import type { IllustrationKey } from "./exerciseTypes";
import { ROUTINES, type Routine, type RoutineId, type Stretch } from "./routines";

const STORAGE_KEY = "stretchy-custom-routines";

const cloudPushHooks: Array<() => void> = [];

export function registerRoutinesCloudPush(hook: () => void): void {
  cloudPushHooks.push(hook);
}

function notifyCloudPush(): void {
  cloudPushHooks.forEach((hook) => hook());
}
const SLOT_COUNT = 5;

export type RoutineSlots = (string | null)[];

type CustomRoutineMap = Partial<Record<RoutineId, RoutineSlots>>;

function readCustom(): CustomRoutineMap {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as CustomRoutineMap;
  } catch {
    return {};
  }
}

function writeCustom(data: CustomRoutineMap): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getDefaultSlots(routineId: RoutineId): RoutineSlots {
  return ROUTINES[routineId].stretches.map((s) => s.exerciseId);
}

export function getRoutineSlots(routineId: RoutineId): RoutineSlots {
  const custom = readCustom()[routineId];
  if (!custom) {
    return getDefaultSlots(routineId);
  }

  const slots = [...custom];
  while (slots.length < SLOT_COUNT) {
    slots.push(null);
  }
  return slots.slice(0, SLOT_COUNT);
}

export function saveRoutineSlots(routineId: RoutineId, slots: RoutineSlots): void {
  const data = readCustom();
  data[routineId] = slots.slice(0, SLOT_COUNT);
  while (data[routineId]!.length < SLOT_COUNT) {
    data[routineId]!.push(null);
  }
  writeCustom(data);
  notifyCloudPush();
}

export function slotsToStretches(slots: RoutineSlots): Stretch[] {
  return slots
    .map((id) => {
      if (!id) return null;
      const exercise = getExerciseById(id);
      if (!exercise) return null;
      return exerciseToStretch(exercise);
    })
    .filter((s): s is Stretch => s !== null);
}

export function exerciseToStretch(exercise: {
  id: string;
  name: string;
  focus: string;
  cue: string;
  explanation: string;
  illustration: IllustrationKey;
}): Stretch {
  return {
    exerciseId: exercise.id,
    name: exercise.name,
    focus: exercise.focus,
    cue: exercise.cue,
    explanation: exercise.explanation,
    illustration: exercise.illustration,
  };
}

export function getEffectiveRoutine(routineId: RoutineId): Routine {
  const base = ROUTINES[routineId];
  const slots = getRoutineSlots(routineId);
  const filled = slotsToStretches(slots);

  if (filled.length === 0) {
    return base;
  }

  return {
    ...base,
    stretches: filled,
  };
}

export const ROUTINE_DAY_LABELS: Record<RoutineId, string> = {
  monday: "Monday Stretchy",
  wednesday: "Wednesday Stretchy",
  friday: "Friday Stretchy",
};

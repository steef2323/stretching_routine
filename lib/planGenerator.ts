import { EXERCISE_CATALOG } from "./exerciseCatalog";
import type { Exercise, MuscleGroupId } from "./exerciseTypes";
import { MUSCLE_GROUPS } from "./exerciseTypes";
import { saveRoutineSlots } from "./customRoutines";
import type { RoutineId } from "./routines";
import { saveStretchDays } from "./stretchDays";

const ROUTINE_IDS: RoutineId[] = ["monday", "wednesday", "friday"];
const STRETCHES_PER_DAY = 5;
const FOCUS_STRETCH_COUNT = 3;

const FOCUS_MAPPINGS: { keywords: string[]; groups: MuscleGroupId[] }[] = [
  {
    keywords: ["lower back", "low back", "lumbar", "spine", "back pain"],
    groups: ["lower-back", "hips", "core"],
  },
  {
    keywords: ["neck", "cervical", "head"],
    groups: ["neck", "shoulders", "upper-back"],
  },
  {
    keywords: ["shoulder", "trap", "upper back", "posture"],
    groups: ["shoulders", "upper-back", "chest"],
  },
  {
    keywords: ["hip", "hip flexor", "pelvis"],
    groups: ["hips", "glutes", "groin"],
  },
  {
    keywords: ["glute", "piriformis", "butt"],
    groups: ["glutes", "hips", "lower-back"],
  },
  {
    keywords: ["hamstring", "leg back", "posterior"],
    groups: ["hamstrings", "calves", "lower-back"],
  },
  {
    keywords: ["quad", "thigh front"],
    groups: ["quadriceps", "hips", "groin"],
  },
  {
    keywords: ["calf", "achilles", "ankle", "foot", "feet"],
    groups: ["calves", "ankles-feet", "hamstrings"],
  },
  {
    keywords: ["chest", "pec", "front body"],
    groups: ["chest", "shoulders", "core"],
  },
  {
    keywords: ["core", "abs", "oblique", "side body"],
    groups: ["core", "lower-back", "hips"],
  },
  {
    keywords: ["groin", "inner thigh", "adductor"],
    groups: ["groin", "hips", "glutes"],
  },
  {
    keywords: ["arm", "wrist", "forearm", "bicep", "tricep"],
    groups: ["arms", "shoulders", "chest"],
  },
  {
    keywords: ["it band", "outer thigh", "lateral"],
    groups: ["it-band", "hips", "quadriceps"],
  },
  {
    keywords: ["full body", "everything", "all over", "whole body"],
    groups: [],
  },
];

const BALANCED_GROUPS: MuscleGroupId[] = MUSCLE_GROUPS.map((g) => g.id);

export interface GeneratedPlan {
  focusLabel: string;
  focusGroups: MuscleGroupId[];
  days: number[];
  routines: Record<RoutineId, Exercise[]>;
}

export function parseFocusToMuscleGroups(focusText: string): MuscleGroupId[] {
  const q = focusText.trim().toLowerCase();
  if (!q) return ["lower-back", "hips", "hamstrings"];

  const matched = new Set<MuscleGroupId>();

  for (const mapping of FOCUS_MAPPINGS) {
    if (mapping.keywords.some((kw) => q.includes(kw))) {
      mapping.groups.forEach((g) => matched.add(g));
    }
  }

  if (matched.size === 0) {
    const byText = EXERCISE_CATALOG.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.focus.toLowerCase().includes(q) ||
        e.muscleGroup.includes(q.replace(/\s+/g, "-"))
    );
    byText.forEach((e) => matched.add(e.muscleGroup));
  }

  if (matched.size === 0) {
    return ["lower-back", "hips", "hamstrings"];
  }

  return [...matched];
}

function pickFiveExercises(
  focusGroups: MuscleGroupId[],
  dayOffset: number
): Exercise[] {
  const focusSet = new Set(focusGroups);
  const focusPool = EXERCISE_CATALOG.filter((e) => focusSet.has(e.muscleGroup));
  const balancePool = EXERCISE_CATALOG.filter((e) => !focusSet.has(e.muscleGroup));

  const orderedBalance: Exercise[] = [];
  for (const group of BALANCED_GROUPS) {
    if (focusSet.has(group)) continue;
    orderedBalance.push(
      ...EXERCISE_CATALOG.filter((e) => e.muscleGroup === group)
    );
  }

  const picked: Exercise[] = [];
  const usedIds = new Set<string>();

  function takeFrom(pool: Exercise[], start: number) {
    if (pool.length === 0) return;
    let i = start;
    let attempts = 0;
    while (picked.length < STRETCHES_PER_DAY && attempts < pool.length * 3) {
      const ex = pool[i % pool.length];
      if (!usedIds.has(ex.id)) {
        picked.push(ex);
        usedIds.add(ex.id);
      }
      i++;
      attempts++;
    }
  }

  const focusCount = Math.min(
    FOCUS_STRETCH_COUNT,
    focusPool.length > 0 ? FOCUS_STRETCH_COUNT : 0
  );

  if (focusPool.length > 0) {
    takeFrom(focusPool, dayOffset * 2);
    while (picked.length < focusCount && focusPool.length > 0) {
      takeFrom(focusPool, dayOffset * 2 + picked.length);
    }
  }

  takeFrom(orderedBalance.length > 0 ? orderedBalance : balancePool, dayOffset);

  if (picked.length < STRETCHES_PER_DAY) {
    takeFrom(EXERCISE_CATALOG, dayOffset + picked.length);
  }

  return picked.slice(0, STRETCHES_PER_DAY);
}

export function generatePlan(
  focusText: string,
  days: number[]
): GeneratedPlan {
  const focusGroups = parseFocusToMuscleGroups(focusText);
  const focusLabel = focusText.trim() || "Full body balance";

  const routines = {
    monday: pickFiveExercises(focusGroups, 0),
    wednesday: pickFiveExercises(focusGroups, 1),
    friday: pickFiveExercises(focusGroups, 2),
  } satisfies Record<RoutineId, Exercise[]>;

  return {
    focusLabel,
    focusGroups,
    days,
    routines,
  };
}

export function applyGeneratedPlan(plan: GeneratedPlan): void {
  saveStretchDays(plan.days);

  for (const routineId of ROUTINE_IDS) {
    const ids = plan.routines[routineId].map((e) => e.id);
    saveRoutineSlots(routineId, ids);
  }
}

export function formatDayLabels(days: number[]): string {
  const labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days.map((d) => labels[d]).join(", ");
}

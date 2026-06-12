import { EXERCISE_CATALOG } from "./exerciseCatalog";
import type { Exercise, MuscleGroupId } from "./exerciseTypes";
import { MUSCLE_GROUPS } from "./exerciseTypes";

export type { Exercise, MuscleGroupId, IllustrationKey } from "./exerciseTypes";
export { MUSCLE_GROUPS } from "./exerciseTypes";

const byId = new Map<string, Exercise>(
  EXERCISE_CATALOG.map((exercise) => [exercise.id, exercise])
);

export function getExerciseById(id: string): Exercise | undefined {
  return byId.get(id);
}

export function getAllExercises(): Exercise[] {
  return EXERCISE_CATALOG;
}

export function getExercisesByGroup(): { groupId: MuscleGroupId; label: string; exercises: Exercise[] }[] {
  return MUSCLE_GROUPS.map((group) => ({
    groupId: group.id,
    label: group.label,
    exercises: EXERCISE_CATALOG.filter((e) => e.muscleGroup === group.id),
  })).filter((section) => section.exercises.length > 0);
}

export function searchExercises(query: string): Exercise[] {
  const q = query.trim().toLowerCase();
  if (!q) return EXERCISE_CATALOG;
  return EXERCISE_CATALOG.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.focus.toLowerCase().includes(q) ||
      e.muscleGroup.includes(q)
  );
}

export const MUSCLE_GROUPS = [
  { id: "neck", label: "Neck & head" },
  { id: "shoulders", label: "Shoulders" },
  { id: "chest", label: "Chest" },
  { id: "upper-back", label: "Upper back" },
  { id: "arms", label: "Arms & wrists" },
  { id: "core", label: "Core & obliques" },
  { id: "lower-back", label: "Lower back" },
  { id: "hips", label: "Hips & hip flexors" },
  { id: "glutes", label: "Glutes" },
  { id: "groin", label: "Groin & inner thigh" },
  { id: "quadriceps", label: "Quadriceps" },
  { id: "hamstrings", label: "Hamstrings" },
  { id: "it-band", label: "IT band & outer thigh" },
  { id: "calves", label: "Calves" },
  { id: "ankles-feet", label: "Ankles & feet" },
] as const;

export type MuscleGroupId = (typeof MUSCLE_GROUPS)[number]["id"];

export type IllustrationKey =
  | "neck-tilt"
  | "neck-flex"
  | "neck-rotate"
  | "shoulder-cross"
  | "shoulder-roll"
  | "chest-doorway"
  | "chest-clasp"
  | "upper-child"
  | "upper-cat"
  | "upper-twist"
  | "upper-puppy"
  | "arm-overhead"
  | "arm-wall"
  | "core-side"
  | "core-cobra"
  | "lower-knee-chest"
  | "lower-twist"
  | "hip-lunge"
  | "hip-pigeon"
  | "hip-butterfly"
  | "glute-figure4"
  | "groin-frog"
  | "groin-straddle"
  | "quad-standing"
  | "hamstring-fold"
  | "it-band"
  | "calf-wall"
  | "ankle-flex";

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroupId;
  focus: string;
  cue: string;
  explanation: string;
  illustration: IllustrationKey;
}

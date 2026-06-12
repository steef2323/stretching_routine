import type { IllustrationKey } from "./exerciseTypes";

export type RoutineId = "monday" | "wednesday" | "friday";

export interface Stretch {
  exerciseId: string;
  name: string;
  focus: string;
  cue: string;
  explanation: string;
  illustration: IllustrationKey;
}

export interface Routine {
  id: RoutineId;
  label: string;
  stretches: Stretch[];
}

export const ROUTINES: Record<RoutineId, Routine> = {
  monday: {
    id: "monday",
    label: "Monday",
    stretches: [
      {
        exerciseId: "childs-pose",
        name: "Child's pose",
        focus: "Lower back",
        cue: "Knees wide, arms forward, breathe into your hips",
        explanation:
          "Sit your hips toward your heels and reach your arms long on the floor.",
        illustration: "upper-child",
      },
      {
        exerciseId: "cat-cow",
        name: "Cat–cow",
        focus: "Lower back / spine",
        cue: "Slowly arch and round your spine",
        explanation:
          "Alternate between rounding and arching your spine with your breath.",
        illustration: "upper-cat",
      },
      {
        exerciseId: "knee-to-chest",
        name: "Knee-to-chest",
        focus: "Lower back",
        cue: "Hug one knee at a time, switch halfway through",
        explanation:
          "Draw one knee toward your chest and keep the other leg long or bent.",
        illustration: "lower-knee-chest",
      },
      {
        exerciseId: "standing-forward-fold",
        name: "Standing forward fold",
        focus: "Hamstrings",
        cue: "Soft knees, let your head hang heavy",
        explanation:
          "Hinge from your hips and let your upper body hang toward the floor.",
        illustration: "hamstring-fold",
      },
      {
        exerciseId: "hip-flexor-lunge",
        name: "Hip flexor lunge",
        focus: "Hips",
        cue: "Back knee down, gentle tuck of the pelvis",
        explanation:
          "Kneel on one knee and gently shift your hips forward with a tall spine.",
        illustration: "hip-lunge",
      },
    ],
  },
  wednesday: {
    id: "wednesday",
    label: "Wednesday",
    stretches: [
      {
        exerciseId: "supine-twist",
        name: "Supine spinal twist",
        focus: "Lower back",
        cue: "Knees to one side, arms wide, switch halfway",
        explanation:
          "Drop both knees to one side while keeping your shoulders grounded.",
        illustration: "lower-twist",
      },
      {
        exerciseId: "figure-four",
        name: "Figure-4 stretch",
        focus: "Lower back / glutes",
        cue: "Ankle on opposite knee, pull through gently",
        explanation:
          "Cross one ankle over the opposite knee and fold forward or pull the leg in.",
        illustration: "glute-figure4",
      },
      {
        exerciseId: "puppy-pose",
        name: "Puppy pose",
        focus: "Lower back / shoulders",
        cue: "Hips over knees, chest melting toward the floor",
        explanation:
          "Keep your hips high while melting your chest toward the floor.",
        illustration: "upper-puppy",
      },
      {
        exerciseId: "standing-quad",
        name: "Standing quad stretch",
        focus: "Quads",
        cue: "Hold a wall if you need balance",
        explanation:
          "Stand tall and draw one heel toward your glute, keeping knees together.",
        illustration: "quad-standing",
      },
      {
        exerciseId: "seated-side-bend",
        name: "Seated side bend",
        focus: "Obliques",
        cue: "Reach overhead, lean gently to each side",
        explanation:
          "Sit tall and reach one arm overhead while leaning to the opposite side.",
        illustration: "core-side",
      },
    ],
  },
  friday: {
    id: "friday",
    label: "Friday",
    stretches: [
      {
        exerciseId: "sphinx",
        name: "Sphinx pose",
        focus: "Lower back",
        cue: "Forearms down, lift your chest lightly",
        explanation:
          "Rest on your forearms and lightly lift your chest forward.",
        illustration: "core-cobra",
      },
      {
        exerciseId: "pigeon-prep",
        name: "Pigeon prep",
        focus: "Hips / lower back",
        cue: "Square your hips, fold forward if comfortable",
        explanation:
          "A gentler pigeon with the front shin less angled and hips supported.",
        illustration: "hip-pigeon",
      },
      {
        exerciseId: "thread-needle",
        name: "Thread the needle",
        focus: "Upper back",
        cue: "On all fours, thread one arm under the other",
        explanation:
          "From all fours, slide one arm under the other and rest your shoulder down.",
        illustration: "upper-twist",
      },
      {
        exerciseId: "downward-dog",
        name: "Downward dog",
        focus: "Calves / hamstrings",
        cue: "Pedal your feet, alternate heel drops",
        explanation:
          "Press your hips up and back, pedaling your heels toward the floor.",
        illustration: "calf-wall",
      },
      {
        exerciseId: "clasped-chest",
        name: "Chest opener",
        focus: "Chest / posture",
        cue: "Clasp hands behind you, open the front of your shoulders",
        explanation:
          "Interlace fingers behind you and lift your hands while opening the chest.",
        illustration: "chest-clasp",
      },
    ],
  },
};

export function getRoutine(id: RoutineId): Routine {
  return ROUTINES[id];
}

export function isRoutineId(value: string): value is RoutineId {
  return value === "monday" || value === "wednesday" || value === "friday";
}

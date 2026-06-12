"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import StretchPill from "@/components/StretchPill";
import {
  getRoutineSlots,
  saveRoutineSlots,
  type RoutineSlots,
} from "@/lib/customRoutines";
import { getExercisesByGroup } from "@/lib/exercises";
import type { Exercise } from "@/lib/exerciseTypes";
import type { RoutineId } from "@/lib/routines";

interface ExerciseLibraryProps {
  routineId: RoutineId;
  slotIndex: number;
}

export default function ExerciseLibrary({
  routineId,
  slotIndex,
}: ExerciseLibraryProps) {
  const router = useRouter();
  const sections = useMemo(() => getExercisesByGroup(), []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const selectedExercise = selectedId
    ? sections.flatMap((s) => s.exercises).find((e) => e.id === selectedId)
    : undefined;

  function handleDiscard() {
    router.push(`/exercises/${routineId}`);
  }

  function handleSave() {
    if (!selectedId) return;

    const slots: RoutineSlots = [...getRoutineSlots(routineId)];
    slots[slotIndex] = selectedId;
    saveRoutineSlots(routineId, slots);
    router.push(`/exercises/${routineId}`);
  }

  function toggleExpand(exercise: Exercise) {
    setExpandedId((current) => (current === exercise.id ? null : exercise.id));
  }

  return (
    <div className={`screen screen-library ${selectedId ? "screen-library-selecting" : ""}`}>
      <header className="library-header">
        <Link href={`/exercises/${routineId}`} className="library-back">
          ← Back
        </Link>
        <h1 className="exercises-title">All stretches</h1>
        <p className="exercises-subtitle">Head to toe · pick one for slot {slotIndex + 1}</p>
      </header>

      <main className="library-main">
        {sections.map((section) => (
          <section key={section.groupId} className="library-section">
            <h2 className="library-group-title">{section.label}</h2>
            <div className="library-pills">
              {section.exercises.map((exercise) => (
                <StretchPill
                  key={exercise.id}
                  variant="selectable"
                  exercise={exercise}
                  selected={selectedId === exercise.id}
                  expanded={expandedId === exercise.id}
                  onSelect={() =>
                    setSelectedId((current) =>
                      current === exercise.id ? null : exercise.id
                    )
                  }
                  onToggleExpand={() => toggleExpand(exercise)}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {selectedExercise && (
        <footer className="library-action-bar">
          <button type="button" className="btn btn-discard" onClick={handleDiscard}>
            Discard
          </button>
          <button type="button" className="btn btn-save" onClick={handleSave}>
            Save
          </button>
        </footer>
      )}
    </div>
  );
}

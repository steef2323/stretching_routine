"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import HamburgerButton from "@/components/HamburgerButton";
import StretchPill from "@/components/StretchPill";
import {
  ROUTINE_DAY_LABELS,
  getRoutineSlots,
  saveRoutineSlots,
  type RoutineSlots,
} from "@/lib/customRoutines";
import { getExerciseById } from "@/lib/exercises";
import type { RoutineId } from "@/lib/routines";

interface ExerciseDayEditorProps {
  routineId: RoutineId;
}

function SortableSlot({
  id,
  slotIndex,
  exerciseId,
  routineId,
  onRemove,
}: {
  id: string;
  slotIndex: number;
  exerciseId: string | null;
  routineId: RoutineId;
  onRemove: (index: number) => void;
}) {
  const router = useRouter();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const exercise = exerciseId ? getExerciseById(exerciseId) : undefined;

  return (
    <div ref={setNodeRef} style={style} className="slot-item">
      {exercise ? (
        <StretchPill
          variant="filled"
          exercise={exercise}
          dragHandle={
            <button
              type="button"
              className="pill-drag"
              aria-label="Drag to reorder"
              {...attributes}
              {...listeners}
            >
              ⠿
            </button>
          }
          onRemove={() => onRemove(slotIndex)}
        />
      ) : (
        <StretchPill
          variant="empty"
          onEmptyClick={() =>
            router.push(`/exercises/${routineId}/pick?slot=${slotIndex}`)
          }
        />
      )}
    </div>
  );
}

export default function ExerciseDayEditor({ routineId }: ExerciseDayEditorProps) {
  const [slots, setSlots] = useState<RoutineSlots>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSlots(getRoutineSlots(routineId));
    setReady(true);
  }, [routineId]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } })
  );

  const slotIds = slots.map((_, i) => `slot-${i}`);

  function persist(next: RoutineSlots) {
    setSlots(next);
    saveRoutineSlots(routineId, next);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = slotIds.indexOf(String(active.id));
    const newIndex = slotIds.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;

    persist(arrayMove(slots, oldIndex, newIndex));
  }

  function handleRemove(index: number) {
    const next = [...slots];
    next[index] = null;
    persist(next);
  }

  if (!ready) {
    return <div className="screen screen-exercises" />;
  }

  return (
    <div className="screen screen-exercises">
      <header className="exercises-header">
        <div className="exercises-header-row">
          <h1 className="exercises-title">{ROUTINE_DAY_LABELS[routineId]}</h1>
          <HamburgerButton />
        </div>
        <p className="exercises-subtitle">Drag to reorder · tap × to remove</p>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={slotIds} strategy={verticalListSortingStrategy}>
          <div className="slot-list">
            {slots.map((exerciseId, index) => (
              <SortableSlot
                key={`slot-${index}`}
                id={`slot-${index}`}
                slotIndex={index}
                exerciseId={exerciseId}
                routineId={routineId}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <footer className="exercises-footer">
        <Link href="/exercises" className="btn btn-secondary">
          Back to days
        </Link>
      </footer>
    </div>
  );
}

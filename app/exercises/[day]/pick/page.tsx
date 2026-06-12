"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import ExerciseLibrary from "@/components/ExerciseLibrary";
import { isRoutineId } from "@/lib/routines";

interface PageProps {
  params: Promise<{ day: string }>;
  searchParams: Promise<{ slot?: string }>;
}

export default function ExercisePickPage({ params, searchParams }: PageProps) {
  const { day } = use(params);
  const { slot: slotParam } = use(searchParams);

  if (!isRoutineId(day)) {
    notFound();
  }

  const slotIndex = Number(slotParam);
  if (!Number.isInteger(slotIndex) || slotIndex < 0 || slotIndex > 4) {
    notFound();
  }

  return <ExerciseLibrary routineId={day} slotIndex={slotIndex} />;
}

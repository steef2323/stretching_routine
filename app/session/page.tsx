"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Session from "@/components/Session";
import type { RoutineId } from "@/lib/routines";
import { getRoutineIdForDate } from "@/lib/schedule";

const VALID_ROUTINES = new Set<RoutineId>(["monday", "wednesday", "friday"]);

function SessionContent() {
  const searchParams = useSearchParams();
  const routineParam = searchParams.get("routine") as RoutineId | null;
  const routineId =
    routineParam && VALID_ROUTINES.has(routineParam)
      ? routineParam
      : getRoutineIdForDate();
  const isAnyway = searchParams.get("anyway") === "1";

  return <Session routineId={routineId} isAnyway={isAnyway} />;
}

export default function SessionPage() {
  return (
    <Suspense fallback={<div className="screen screen-session" />}>
      <SessionContent />
    </Suspense>
  );
}

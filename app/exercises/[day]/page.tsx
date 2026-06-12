import { notFound } from "next/navigation";
import ExerciseDayEditor from "@/components/ExerciseDayEditor";
import { isRoutineId } from "@/lib/routines";

interface PageProps {
  params: Promise<{ day: string }>;
}

export default async function ExerciseDayPage({ params }: PageProps) {
  const { day } = await params;

  if (!isRoutineId(day)) {
    notFound();
  }

  return <ExerciseDayEditor routineId={day} />;
}

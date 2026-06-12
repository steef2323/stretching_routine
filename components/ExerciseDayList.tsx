import Link from "next/link";
import HamburgerButton from "@/components/HamburgerButton";
import { ROUTINE_DAY_LABELS } from "@/lib/customRoutines";
import type { RoutineId } from "@/lib/routines";

const DAYS: RoutineId[] = ["monday", "wednesday", "friday"];

export default function ExerciseDayList() {
  return (
    <div className="screen screen-exercises">
      <header className="exercises-header">
        <div className="exercises-header-row">
          <h1 className="exercises-title">Select my Stretchy</h1>
          <HamburgerButton />
        </div>
        <p className="exercises-subtitle">Choose a stretching day to customise</p>
      </header>

      <nav className="exercises-day-list">
        {DAYS.map((day) => (
          <Link key={day} href={`/exercises/${day}`} className="menu-item">
            {ROUTINE_DAY_LABELS[day]}
          </Link>
        ))}
      </nav>

      <footer className="exercises-footer">
        <Link href="/" className="btn btn-secondary">
          Back home
        </Link>
      </footer>
    </div>
  );
}

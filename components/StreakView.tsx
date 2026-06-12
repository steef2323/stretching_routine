import Link from "next/link";
import Calendar from "@/components/Calendar";
import HamburgerButton from "@/components/HamburgerButton";

export default function StreakView() {
  return (
    <div className="screen screen-streak">
      <div className="page-top">
        <HamburgerButton />
      </div>

      <header className="streak-header">
        <h1 className="streak-title">Your streak</h1>
      </header>

      <main className="streak-main">
        <Calendar />
      </main>

      <footer className="streak-footer">
        <Link href="/" className="btn btn-secondary">
          Back home
        </Link>
      </footer>
    </div>
  );
}

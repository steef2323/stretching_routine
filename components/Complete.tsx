"use client";

import Link from "next/link";
import Calendar from "@/components/Calendar";

export default function Complete() {
  return (
    <div className="screen screen-complete">
      <header className="complete-header">
        <h1 className="complete-title">You made Stretchy proud</h1>
      </header>

      <main className="complete-main">
        <Calendar />
      </main>

      <footer className="complete-footer">
        <Link href="/" className="btn btn-secondary">
          Back home
        </Link>
      </footer>
    </div>
  );
}

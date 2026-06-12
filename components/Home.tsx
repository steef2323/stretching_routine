"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { initAudio } from "@/lib/chime";
import {
  getGreeting,
  getRoutineIdForDate,
  isStretchDay,
} from "@/lib/schedule";
import type { RoutineId } from "@/lib/routines";
import HamburgerButton from "@/components/HamburgerButton";

export default function Home() {
  const router = useRouter();
  const [greeting, setGreeting] = useState("");
  const [stretchDay, setStretchDay] = useState(true);
  const [routineId, setRoutineId] = useState<RoutineId>("monday");

  useEffect(() => {
    function refresh() {
      const now = new Date();
      setGreeting(getGreeting(now));
      setStretchDay(isStretchDay(now));
      setRoutineId(getRoutineIdForDate(now));
    }

    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, []);

  function startSession(anyway: boolean) {
    initAudio();
    const params = new URLSearchParams({
      routine: routineId,
      anyway: anyway ? "1" : "0",
    });
    router.push(`/session?${params.toString()}`);
  }

  return (
    <div className="screen screen-home">
      <header className="home-header">
        <p className="app-name">Stretchy</p>
        <HamburgerButton />
      </header>

      <main className="home-main">
        <h1 className="greeting">{greeting || "\u00a0"}</h1>
        {!stretchDay && (
          <p className="home-message rest-message">
            You should be rest stretching dear Sir
          </p>
        )}
      </main>

      <footer className="home-footer">
        {stretchDay ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => startSession(false)}
          >
            Start getting Stretchy
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => startSession(true)}
          >
            Stretch anyway
          </button>
        )}
      </footer>
    </div>
  );
}

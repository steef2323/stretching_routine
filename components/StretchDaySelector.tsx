"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HamburgerButton from "@/components/HamburgerButton";
import {
  OPTIMAL_DAYS_PER_WEEK,
  WEEKDAY_OPTIONS,
  getStretchDays,
  saveStretchDays,
  shouldWarnOnAdd,
  shouldWarnOnRemove,
} from "@/lib/stretchDays";

type PendingAction = { type: "add" | "remove"; dow: number };

export default function StretchDaySelector() {
  const [selected, setSelected] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState<PendingAction | null>(null);

  useEffect(() => {
    setSelected(getStretchDays());
    setReady(true);
  }, []);

  function applyChange(next: number[]) {
    setSelected(next);
    saveStretchDays(next);
  }

  function confirmPending() {
    if (!pending) return;

    if (pending.type === "add") {
      applyChange([...selected, pending.dow]);
    } else {
      applyChange(selected.filter((d) => d !== pending.dow));
    }

    setPending(null);
  }

  function handleDayTap(dow: number) {
    const isSelected = selected.includes(dow);

    if (isSelected) {
      if (selected.length <= 1) return;
      if (shouldWarnOnRemove()) {
        setPending({ type: "remove", dow });
        return;
      }
      applyChange(selected.filter((d) => d !== dow));
      return;
    }

    if (shouldWarnOnAdd(selected.length)) {
      setPending({ type: "add", dow });
      return;
    }

    applyChange([...selected, dow]);
  }

  if (!ready) {
    return <div className="screen screen-exercises" />;
  }

  return (
    <div className="screen screen-exercises">
      <header className="exercises-header">
        <div className="exercises-header-row">
          <h1 className="exercises-title">Select my days</h1>
          <HamburgerButton />
        </div>
        <p className="exercises-subtitle">
          {selected.length} day{selected.length === 1 ? "" : "s"} selected · default
          is {OPTIMAL_DAYS_PER_WEEK}× per week
        </p>
      </header>

      <div className="exercises-day-list">
        {WEEKDAY_OPTIONS.map(({ dow, label }) => {
          const isActive = selected.includes(dow);
          return (
            <button
              key={dow}
              type="button"
              className={`menu-item day-pill ${isActive ? "day-pill-active" : ""}`}
              onClick={() => handleDayTap(dow)}
            >
              <span>{label}</span>
              {isActive && <span className="day-pill-check">✓</span>}
            </button>
          );
        })}
      </div>

      <footer className="exercises-footer">
        <Link href="/" className="btn btn-secondary">
          Back home
        </Link>
      </footer>

      {pending && (
        <div className="day-warning-overlay" role="dialog" aria-modal="true">
          <div className="day-warning-card">
            <p className="day-warning-text">Stretchy 3x a week is optimal</p>
            <div className="day-warning-actions">
              <button
                type="button"
                className="btn btn-discard"
                onClick={() => setPending(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-save"
                onClick={confirmPending}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

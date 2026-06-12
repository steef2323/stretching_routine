"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HamburgerButton from "@/components/HamburgerButton";
import { ROUTINE_DAY_LABELS } from "@/lib/customRoutines";
import {
  applyGeneratedPlan,
  formatDayLabels,
  generatePlan,
  type GeneratedPlan,
} from "@/lib/planGenerator";
import type { RoutineId } from "@/lib/routines";
import { DEFAULT_STRETCH_DAYS, WEEKDAY_OPTIONS } from "@/lib/stretchDays";

const ROUTINE_ORDER: RoutineId[] = ["monday", "wednesday", "friday"];

export default function StretchyHelp() {
  const router = useRouter();
  const [focus, setFocus] = useState("");
  const [selectedDays, setSelectedDays] = useState<number[]>([...DEFAULT_STRETCH_DAYS]);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [error, setError] = useState("");

  function toggleDay(dow: number) {
    setSelectedDays((current) => {
      if (current.includes(dow)) {
        if (current.length <= 1) return current;
        return current.filter((d) => d !== dow);
      }
      return [...current, dow].sort((a, b) => {
        const order = (d: number) => (d === 0 ? 7 : d);
        return order(a) - order(b);
      });
    });
  }

  function handleCreate() {
    setError("");

    if (!focus.trim()) {
      setError("Tell Stretchy which area you'd like to focus on.");
      return;
    }

    if (selectedDays.length === 0) {
      setError("Pick at least one day to Stretchy.");
      return;
    }

    const generated = generatePlan(focus, selectedDays);
    applyGeneratedPlan(generated);
    setPlan(generated);
  }

  if (plan) {
    return (
      <div className="screen screen-help">
        <header className="exercises-header">
          <div className="exercises-header-row">
            <h1 className="exercises-title">Your plan is ready</h1>
            <HamburgerButton />
          </div>
          <p className="exercises-subtitle">
            Focus: {plan.focusLabel} · {formatDayLabels(plan.days)}
          </p>
        </header>

        <main className="help-plan-summary">
          {ROUTINE_ORDER.map((routineId) => (
            <section key={routineId} className="help-routine-block">
              <h2 className="help-routine-title">{ROUTINE_DAY_LABELS[routineId]}</h2>
              <ul className="help-stretch-list">
                {plan.routines[routineId].map((exercise) => (
                  <li key={exercise.id} className="menu-item help-stretch-item">
                    <span className="help-stretch-name">{exercise.name}</span>
                    <span className="pill-focus">{exercise.focus}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </main>

        <footer className="help-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => router.push("/")}
          >
            Start getting Stretchy
          </button>
          <Link href="/exercises" className="btn btn-secondary">
            View my Stretchy
          </Link>
        </footer>
      </div>
    );
  }

  return (
    <div className="screen screen-help">
      <header className="exercises-header">
        <div className="exercises-header-row">
          <h1 className="exercises-title">Let Stretchy help you</h1>
          <HamburgerButton />
        </div>
        <p className="exercises-subtitle">
          Answer two quick questions and Stretchy will build your plan
        </p>
      </header>

      <main className="help-form">
        <label className="help-field">
          <span className="help-label">What part of your body do you want to focus on?</span>
          <input
            type="text"
            className="help-input"
            placeholder="e.g. lower back, hips, full body"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
          />
        </label>

        <fieldset className="help-field">
          <legend className="help-label">Which days of the week do you want to Stretchy?</legend>
          <div className="help-day-list">
            {WEEKDAY_OPTIONS.map(({ dow, label }) => {
              const isActive = selectedDays.includes(dow);
              return (
                <button
                  key={dow}
                  type="button"
                  className={`menu-item day-pill ${isActive ? "day-pill-active" : ""}`}
                  onClick={() => toggleDay(dow)}
                >
                  <span>{label}</span>
                  {isActive && <span className="day-pill-check">✓</span>}
                </button>
              );
            })}
          </div>
        </fieldset>

        {error && <p className="help-error">{error}</p>}
      </main>

      <footer className="help-footer">
        <button type="button" className="btn btn-primary" onClick={handleCreate}>
          Create my Stretchy plan
        </button>
        <Link href="/" className="btn btn-secondary">
          Back home
        </Link>
      </footer>
    </div>
  );
}

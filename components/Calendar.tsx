"use client";

import { useMemo, useState } from "react";
import {
  calculateCurrentStreak,
  calculateLongestStreak,
  getCompletedDates,
} from "@/lib/storage";
import { formatLocalDate } from "@/lib/schedule";
import { getStretchDays } from "@/lib/stretchDays";

const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export default function Calendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const completedDates = useMemo(() => getCompletedDates(), []);
  const currentStreak = useMemo(() => calculateCurrentStreak(), []);
  const longestStreak = useMemo(() => calculateLongestStreak(), []);
  const stretchDays = useMemo(() => new Set(getStretchDays()), []);

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(
    undefined,
    { month: "long", year: "numeric" }
  );

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0);
    const startOffset = (firstDay.getDay() + 6) % 7; // Monday-start grid
    const days: Array<{ date: Date | null; key: string }> = [];

    for (let i = 0; i < startOffset; i++) {
      days.push({ date: null, key: `empty-${i}` });
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(viewYear, viewMonth, d);
      days.push({ date, key: formatLocalDate(date) });
    }

    return days;
  }, [viewYear, viewMonth]);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  const todayKey = formatLocalDate(today);

  return (
    <div className="calendar">
      <div className="streak-stats">
        <div className="streak-stat">
          <span className="streak-value">{currentStreak}</span>
          <span className="streak-label">Current streak</span>
        </div>
        <div className="streak-stat">
          <span className="streak-value">{longestStreak}</span>
          <span className="streak-label">Best streak</span>
        </div>
      </div>

      <div className="calendar-nav">
        <button type="button" className="btn-nav" onClick={prevMonth} aria-label="Previous month">
          ‹
        </button>
        <span className="calendar-month">{monthLabel}</span>
        <button type="button" className="btn-nav" onClick={nextMonth} aria-label="Next month">
          ›
        </button>
      </div>

      <div className="calendar-grid">
        {WEEKDAY_LABELS.map((label, i) => (
          <span key={`wd-${i}`} className="calendar-weekday">
            {label}
          </span>
        ))}
        {calendarDays.map(({ date, key }) => {
          if (!date) {
            return <span key={key} className="calendar-day calendar-day-empty" />;
          }

          const dateKey = formatLocalDate(date);
          const isCompleted = completedDates.has(dateKey);
          const isToday = dateKey === todayKey;
          const isScheduled = stretchDays.has(date.getDay());

          return (
            <span
              key={key}
              className={[
                "calendar-day",
                isCompleted ? "calendar-day-done" : "",
                isToday ? "calendar-day-today" : "",
                isScheduled ? "calendar-day-scheduled" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {date.getDate()}
            </span>
          );
        })}
      </div>

      <p className="calendar-legend">
        <span className="legend-dot legend-dot-done" /> Completed
        <span className="legend-dot legend-dot-scheduled" /> Stretch day
      </p>
    </div>
  );
}

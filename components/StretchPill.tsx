"use client";

import type { ReactNode } from "react";
import StretchIllustration from "@/components/StretchIllustration";
import type { Exercise } from "@/lib/exerciseTypes";

interface StretchPillProps {
  variant: "filled" | "empty" | "selectable";
  exercise?: Exercise;
  expanded?: boolean;
  selected?: boolean;
  dragHandle?: ReactNode;
  onToggleExpand?: () => void;
  onRemove?: () => void;
  onSelect?: () => void;
  onEmptyClick?: () => void;
}

export default function StretchPill({
  variant,
  exercise,
  expanded = false,
  selected = false,
  dragHandle,
  onToggleExpand,
  onRemove,
  onSelect,
  onEmptyClick,
}: StretchPillProps) {
  if (variant === "empty") {
    return (
      <button type="button" className="pill pill-empty" onClick={onEmptyClick}>
        Select new Stretchy
      </button>
    );
  }

  if (!exercise) return null;

  const className = [
    "pill",
    variant === "selectable" ? "pill-selectable" : "pill-filled",
    selected ? "pill-selected" : "",
    expanded ? "pill-expanded" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <div className="pill-row">
        {dragHandle}
        <button
          type="button"
          className="pill-main"
          onClick={variant === "selectable" ? onSelect : undefined}
        >
          <span className="pill-name">{exercise.name}</span>
          <span className="pill-focus">{exercise.focus}</span>
        </button>
        {onRemove && (
          <button
            type="button"
            className="pill-remove"
            onClick={onRemove}
            aria-label={`Remove ${exercise.name}`}
          >
            ×
          </button>
        )}
        {onToggleExpand && (
          <button
            type="button"
            className={`pill-expand ${expanded ? "pill-expand-open" : ""}`}
            onClick={onToggleExpand}
            aria-label={expanded ? "Hide details" : "Show stretch details"}
            aria-expanded={expanded}
          >
            <ChevronIcon />
          </button>
        )}
      </div>
      {expanded && (
        <div className="pill-details">
          <StretchIllustration illustration={exercise.illustration} />
          <p className="pill-cue">{exercise.cue}</p>
          <p className="pill-explanation">{exercise.explanation}</p>
        </div>
      )}
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="pill-chevron"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden
    >
      <path
        d="M4 6 L8 10 L12 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

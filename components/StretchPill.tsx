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
          onClick={variant === "selectable" ? onSelect : onToggleExpand}
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
        {variant === "selectable" && (
          <button
            type="button"
            className="pill-expand"
            onClick={onToggleExpand}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? "−" : "+"}
          </button>
        )}
        {variant === "filled" && onToggleExpand && (
          <button
            type="button"
            className="pill-expand"
            onClick={onToggleExpand}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? "−" : "+"}
          </button>
        )}
      </div>
      {expanded && (
        <div className="pill-details">
          <StretchIllustration illustration={exercise.illustration} />
          <p className="pill-explanation">{exercise.explanation}</p>
        </div>
      )}
    </div>
  );
}

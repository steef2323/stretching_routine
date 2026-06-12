import type { ReactNode } from "react";

export interface FigureStyle {
  stroke: string;
  fill: string;
  accent: string;
}

interface Point {
  x: number;
  y: number;
}

export function Limb({
  from,
  to,
  style,
  accent = false,
  width = 2.5,
}: {
  from: Point;
  to: Point;
  style: FigureStyle;
  accent?: boolean;
  width?: number;
}) {
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={accent ? style.accent : style.stroke}
      strokeWidth={width}
      strokeLinecap="round"
    />
  );
}

export function Head({
  center,
  style,
  radius = 8,
  tiltDeg = 0,
}: {
  center: Point;
  style: FigureStyle;
  radius?: number;
  tiltDeg?: number;
}) {
  return (
    <circle
      cx={center.x}
      cy={center.y}
      r={radius}
      fill={style.fill}
      stroke={style.stroke}
      strokeWidth="1.5"
      transform={`rotate(${tiltDeg} ${center.x} ${center.y})`}
    />
  );
}

export function Torso({
  path,
  style,
}: {
  path: string;
  style: FigureStyle;
}) {
  return (
    <path
      d={path}
      fill="none"
      stroke={style.stroke}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export function Ground({ y, style }: { y: number; style: FigureStyle }) {
  return (
    <line
      x1="12"
      y1={y}
      x2="148"
      y2={y}
      stroke={style.stroke}
      strokeWidth="1"
      strokeOpacity="0.35"
      strokeLinecap="round"
    />
  );
}

export function Wall({ x, style }: { x: number; style: FigureStyle }) {
  return (
    <rect
      x={x}
      y="8"
      width="7"
      height="78"
      rx="2"
      fill={style.fill}
      stroke={style.stroke}
      strokeWidth="1.5"
      opacity="0.9"
    />
  );
}

export function MotionArc({
  d,
  style,
}: {
  d: string;
  style: FigureStyle;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={style.accent}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="3 4"
      opacity="0.85"
    />
  );
}

export function FigureWrap({ children }: { children: ReactNode }) {
  return <g>{children}</g>;
}

export function defaultFigureStyle(): FigureStyle {
  return {
    stroke: "var(--color-text-muted)",
    fill: "var(--color-bg-soft)",
    accent: "var(--color-accent-dark)",
  };
}

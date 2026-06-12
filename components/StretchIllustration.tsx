import type { IllustrationKey } from "@/lib/exerciseTypes";
import {
  Ground,
  Head,
  Limb,
  MotionArc,
  Torso,
  Wall,
  defaultFigureStyle,
} from "./stretchFigure";

interface StretchIllustrationProps {
  illustration: IllustrationKey | string;
  className?: string;
}

export default function StretchIllustration({
  illustration,
  className = "",
}: StretchIllustrationProps) {
  return (
    <svg
      viewBox="0 0 160 100"
      className={`stretch-illustration ${className}`.trim()}
      aria-hidden
    >
      {renderIllustration(illustration as IllustrationKey)}
    </svg>
  );
}

function renderIllustration(key: IllustrationKey) {
  const s = defaultFigureStyle();

  switch (key) {
    case "neck-tilt":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 78, y: 28 }} style={s} tiltDeg={-22} />
          <Torso path="M 78 36 L 78 58 L 72 82" style={s} />
          <Limb from={{ x: 78, y: 44 }} to={{ x: 98, y: 54 }} style={s} />
          <Limb from={{ x: 78, y: 44 }} to={{ x: 58, y: 70 }} style={s} />
          <MotionArc d="M 88 24 Q 96 34 88 42" style={s} />
        </>
      );

    case "neck-flex":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 80, y: 34 }} style={s} tiltDeg={18} />
          <Torso path="M 80 42 L 80 64 L 74 82" style={s} />
          <Limb from={{ x: 80, y: 48 }} to={{ x: 100, y: 62 }} style={s} />
          <Limb from={{ x: 80, y: 48 }} to={{ x: 62, y: 72 }} style={s} />
          <MotionArc d="M 72 30 Q 68 40 74 48" style={s} />
        </>
      );

    case "neck-rotate":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 88, y: 30 }} style={s} tiltDeg={35} />
          <Torso path="M 82 38 L 76 58 L 70 82" style={s} />
          <Limb from={{ x: 80, y: 44 }} to={{ x: 58, y: 56 }} style={s} />
          <Limb from={{ x: 80, y: 44 }} to={{ x: 96, y: 68 }} style={s} />
          <MotionArc d="M 96 26 Q 104 32 100 40" style={s} />
        </>
      );

    case "shoulder-cross":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 80, y: 22 }} style={s} />
          <Torso path="M 80 30 L 80 56 L 74 82" style={s} />
          <Limb from={{ x: 80, y: 36 }} to={{ x: 108, y: 44 }} style={s} />
          <Limb from={{ x: 80, y: 36 }} to={{ x: 52, y: 48 }} style={s} accent />
          <Limb from={{ x: 52, y: 48 }} to={{ x: 38, y: 40 }} style={s} accent />
        </>
      );

    case "shoulder-roll":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 80, y: 22 }} style={s} />
          <Torso path="M 80 30 L 80 56 L 74 82" style={s} />
          <Limb from={{ x: 80, y: 36 }} to={{ x: 58, y: 44 }} style={s} />
          <Limb from={{ x: 80, y: 36 }} to={{ x: 102, y: 44 }} style={s} />
          <MotionArc d="M 58 40 Q 80 24 102 40" style={s} />
        </>
      );

    case "chest-doorway":
      return (
        <>
          <Wall x={18} style={s} />
          <Wall x={134} style={s} />
          <Head center={{ x: 96, y: 26 }} style={s} />
          <Torso path="M 96 34 L 88 58 L 84 82" style={s} />
          <Limb from={{ x: 92, y: 40 }} to={{ x: 26, y: 38 }} style={s} accent />
          <Limb from={{ x: 92, y: 40 }} to={{ x: 26, y: 52 }} style={s} accent />
          <MotionArc d="M 88 48 Q 72 52 60 48" style={s} />
        </>
      );

    case "chest-clasp":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 80, y: 22 }} style={s} />
          <Torso path="M 80 30 L 80 56 L 74 82" style={s} />
          <Limb from={{ x: 80, y: 38 }} to={{ x: 62, y: 50 }} style={s} />
          <Limb from={{ x: 80, y: 38 }} to={{ x: 98, y: 50 }} style={s} />
          <path
            d="M 62 50 Q 80 62 98 50"
            fill="none"
            stroke={s.accent}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <MotionArc d="M 80 58 Q 80 66 80 72" style={s} />
        </>
      );

    case "upper-child":
      return (
        <>
          <Ground y={78} style={s} />
          <Head center={{ x: 52, y: 48 }} style={s} />
          <Torso path="M 56 52 Q 72 58 88 52" style={s} />
          <Limb from={{ x: 58, y: 54 }} to={{ x: 28, y: 72 }} style={s} />
          <Limb from={{ x: 86, y: 54 }} to={{ x: 116, y: 72 }} style={s} />
          <Limb from={{ x: 72, y: 58 }} to={{ x: 72, y: 78 }} style={s} />
        </>
      );

    case "upper-cat":
      return (
        <>
          <Ground y={76} style={s} />
          <Head center={{ x: 44, y: 50 }} style={s} tiltDeg={-12} />
          <Torso path="M 48 54 Q 72 38 96 54" style={s} />
          <Limb from={{ x: 50, y: 56 }} to={{ x: 34, y: 72 }} style={s} />
          <Limb from={{ x: 94, y: 56 }} to={{ x: 110, y: 72 }} style={s} />
          <MotionArc d="M 72 42 Q 72 32 72 26" style={s} />
        </>
      );

    case "upper-twist":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 62, y: 36 }} style={s} tiltDeg={18} />
          <Torso path="M 68 42 Q 88 48 96 62 L 90 82" style={s} />
          <Limb from={{ x: 74, y: 48 }} to={{ x: 112, y: 40 }} style={s} accent />
          <Limb from={{ x: 74, y: 48 }} to={{ x: 48, y: 68 }} style={s} />
        </>
      );

    case "upper-puppy":
      return (
        <>
          <Ground y={78} style={s} />
          <Head center={{ x: 42, y: 56 }} style={s} />
          <Torso path="M 48 58 L 72 50 L 96 58" style={s} />
          <Limb from={{ x: 50, y: 60 }} to={{ x: 34, y: 74 }} style={s} />
          <Limb from={{ x: 94, y: 60 }} to={{ x: 110, y: 74 }} style={s} />
          <Limb from={{ x: 72, y: 52 }} to={{ x: 72, y: 76 }} style={s} />
          <MotionArc d="M 42 62 Q 56 72 68 62" style={s} />
        </>
      );

    case "arm-overhead":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 80, y: 48 }} style={s} />
          <Torso path="M 80 56 L 80 72 L 74 82" style={s} />
          <Limb from={{ x: 80, y: 60 }} to={{ x: 58, y: 22 }} style={s} accent />
          <Limb from={{ x: 80, y: 60 }} to={{ x: 102, y: 72 }} style={s} />
        </>
      );

    case "arm-wall":
      return (
        <>
          <Wall x={16} style={s} />
          <Head center={{ x: 62, y: 28 }} style={s} />
          <Torso path="M 62 36 L 62 58 L 58 82" style={s} />
          <Limb from={{ x: 62, y: 42 }} to={{ x: 24, y: 42 }} style={s} accent />
          <Limb from={{ x: 62, y: 42 }} to={{ x: 88, y: 58 }} style={s} />
        </>
      );

    case "core-side":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 72, y: 30 }} style={s} tiltDeg={-12} />
          <Torso path="M 76 36 Q 92 52 80 72 L 74 82" style={s} />
          <Limb from={{ x: 78, y: 40 }} to={{ x: 96, y: 14 }} style={s} accent />
          <Limb from={{ x: 78, y: 40 }} to={{ x: 58, y: 68 }} style={s} />
        </>
      );

    case "core-cobra":
      return (
        <>
          <Ground y={78} style={s} />
          <Torso path="M 28 74 Q 52 68 68 52 Q 84 36 104 30" style={s} />
          <Limb from={{ x: 68, y: 52 }} to={{ x: 58, y: 74 }} style={s} />
          <Limb from={{ x: 68, y: 52 }} to={{ x: 78, y: 74 }} style={s} />
          <Limb from={{ x: 36, y: 72 }} to={{ x: 52, y: 74 }} style={s} />
          <Limb from={{ x: 88, y: 72 }} to={{ x: 104, y: 74 }} style={s} />
          <Head center={{ x: 108, y: 26 }} style={s} tiltDeg={12} />
          <MotionArc d="M 72 48 Q 80 36 88 30" style={s} />
        </>
      );

    case "lower-knee-chest":
      return (
        <>
          <Ground y={72} style={s} />
          <Head center={{ x: 44, y: 48 }} style={s} />
          <Torso path="M 48 52 L 72 56 L 108 60" style={s} />
          <Limb from={{ x: 72, y: 58 }} to={{ x: 72, y: 72 }} style={s} />
          <Limb from={{ x: 72, y: 58 }} to={{ x: 96, y: 68 }} style={s} accent />
          <Limb from={{ x: 108, y: 60 }} to={{ x: 132, y: 68 }} style={s} />
        </>
      );

    case "lower-twist":
      return (
        <>
          <Ground y={72} style={s} />
          <Head center={{ x: 38, y: 46 }} style={s} tiltDeg={16} />
          <Torso path="M 44 50 L 72 54" style={s} />
          <path
            d="M 72 54 Q 96 48 108 62 L 118 72"
            fill="none"
            stroke={s.stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <Limb from={{ x: 72, y: 56 }} to={{ x: 52, y: 68 }} style={s} />
          <Limb from={{ x: 108, y: 62 }} to={{ x: 132, y: 56 }} style={s} accent />
        </>
      );

    case "hip-lunge":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 72, y: 22 }} style={s} />
          <Torso path="M 72 30 L 78 50 L 88 62" style={s} />
          <Limb from={{ x: 76, y: 36 }} to={{ x: 58, y: 48 }} style={s} />
          <Limb from={{ x: 76, y: 36 }} to={{ x: 94, y: 48 }} style={s} />
          <Limb from={{ x: 88, y: 62 }} to={{ x: 72, y: 82 }} style={s} />
          <Limb from={{ x: 88, y: 62 }} to={{ x: 118, y: 82 }} style={s} accent />
          <circle cx="118" cy="82" r="3" fill={s.fill} stroke={s.stroke} />
        </>
      );

    case "hip-pigeon":
      return (
        <>
          <Ground y={78} style={s} />
          <Head center={{ x: 48, y: 44 }} style={s} />
          <Torso path="M 54 48 L 78 54 L 96 62" style={s} />
          <Limb from={{ x: 56, y: 50 }} to={{ x: 38, y: 64 }} style={s} />
          <path
            d="M 78 54 L 62 72 L 48 78"
            fill="none"
            stroke={s.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <Limb from={{ x: 96, y: 62 }} to={{ x: 124, y: 76 }} style={s} />
        </>
      );

    case "hip-butterfly":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 80, y: 28 }} style={s} />
          <Torso path="M 80 36 L 80 52 L 76 68" style={s} />
          <Limb from={{ x: 80, y: 52 }} to={{ x: 52, y: 78 }} style={s} accent />
          <Limb from={{ x: 80, y: 52 }} to={{ x: 108, y: 78 }} style={s} accent />
          <Limb from={{ x: 80, y: 40 }} to={{ x: 64, y: 56 }} style={s} />
          <Limb from={{ x: 80, y: 40 }} to={{ x: 96, y: 56 }} style={s} />
        </>
      );

    case "glute-figure4":
      return (
        <>
          <Ground y={72} style={s} />
          <Head center={{ x: 40, y: 44 }} style={s} />
          <Torso path="M 44 48 L 68 52 L 100 56" style={s} />
          <Limb from={{ x: 68, y: 54 }} to={{ x: 68, y: 68 }} style={s} />
          <path
            d="M 68 58 L 92 46 L 104 56"
            fill="none"
            stroke={s.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <Limb from={{ x: 100, y: 56 }} to={{ x: 124, y: 64 }} style={s} />
        </>
      );

    case "groin-frog":
      return (
        <>
          <Ground y={78} style={s} />
          <Head center={{ x: 80, y: 36 }} style={s} />
          <Torso path="M 80 44 L 80 58" style={s} />
          <Limb from={{ x: 80, y: 58 }} to={{ x: 44, y: 76 }} style={s} accent />
          <Limb from={{ x: 80, y: 58 }} to={{ x: 116, y: 76 }} style={s} accent />
          <Limb from={{ x: 80, y: 48 }} to={{ x: 64, y: 62 }} style={s} />
          <Limb from={{ x: 80, y: 48 }} to={{ x: 96, y: 62 }} style={s} />
        </>
      );

    case "groin-straddle":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 80, y: 24 }} style={s} />
          <Torso path="M 80 32 L 80 48 L 76 62" style={s} />
          <Limb from={{ x: 80, y: 48 }} to={{ x: 38, y: 82 }} style={s} accent />
          <Limb from={{ x: 80, y: 48 }} to={{ x: 122, y: 82 }} style={s} accent />
          <Limb from={{ x: 80, y: 38 }} to={{ x: 64, y: 52 }} style={s} />
          <MotionArc d="M 80 54 L 80 68" style={s} />
        </>
      );

    case "quad-standing":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 72, y: 20 }} style={s} />
          <Torso path="M 72 28 L 72 50 L 68 82" style={s} />
          <Limb from={{ x: 72, y: 34 }} to={{ x: 54, y: 46 }} style={s} />
          <Limb from={{ x: 72, y: 34 }} to={{ x: 90, y: 46 }} style={s} />
          <path
            d="M 68 82 Q 88 62 104 38"
            fill="none"
            stroke={s.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="104" cy="38" r="3" fill={s.fill} stroke={s.stroke} />
        </>
      );

    case "hamstring-fold":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 80, y: 58 }} style={s} />
          <Torso path="M 80 66 L 80 76" style={s} />
          <Limb from={{ x: 80, y: 68 }} to={{ x: 58, y: 82 }} style={s} />
          <Limb from={{ x: 80, y: 68 }} to={{ x: 102, y: 82 }} style={s} />
          <path
            d="M 80 68 L 58 28"
            fill="none"
            stroke={s.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 80 68 L 102 28"
            fill="none"
            stroke={s.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      );

    case "it-band":
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 68, y: 22 }} style={s} tiltDeg={-8} />
          <Torso path="M 72 30 L 78 52 L 84 68" style={s} />
          <Limb from={{ x: 76, y: 36 }} to={{ x: 58, y: 48 }} style={s} />
          <Limb from={{ x: 76, y: 36 }} to={{ x: 92, y: 48 }} style={s} />
          <Limb from={{ x: 84, y: 68 }} to={{ x: 68, y: 82 }} style={s} />
          <Limb from={{ x: 84, y: 68 }} to={{ x: 108, y: 82 }} style={s} />
          <MotionArc d="M 88 56 Q 100 60 96 72" style={s} />
        </>
      );

    case "calf-wall":
      return (
        <>
          <Wall x={16} style={s} />
          <Head center={{ x: 68, y: 26 }} style={s} />
          <Torso path="M 68 34 L 68 52 L 64 68" style={s} />
          <Limb from={{ x: 68, y: 40 }} to={{ x: 52, y: 52 }} style={s} />
          <Limb from={{ x: 68, y: 40 }} to={{ x: 84, y: 52 }} style={s} />
          <Limb from={{ x: 64, y: 68 }} to={{ x: 64, y: 82 }} style={s} accent />
          <Limb from={{ x: 64, y: 68 }} to={{ x: 96, y: 82 }} style={s} />
          <MotionArc d="M 96 74 Q 104 70 104 62" style={s} />
        </>
      );

    case "ankle-flex":
      return (
        <>
          <Ground y={78} style={s} />
          <Torso path="M 48 68 L 88 68" style={s} />
          <Limb from={{ x: 68, y: 68 }} to={{ x: 68, y: 48 }} style={s} accent />
          <path
            d="M 68 48 L 84 42 L 68 34"
            fill="none"
            stroke={s.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <MotionArc d="M 84 40 Q 92 44 84 50" style={s} />
        </>
      );

    default:
      return (
        <>
          <Ground y={82} style={s} />
          <Head center={{ x: 80, y: 24 }} style={s} />
          <Torso path="M 80 32 L 80 56 L 74 82" style={s} />
          <Limb from={{ x: 80, y: 38 }} to={{ x: 58, y: 52 }} style={s} />
          <Limb from={{ x: 80, y: 38 }} to={{ x: 102, y: 52 }} style={s} />
        </>
      );
  }
}

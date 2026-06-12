import type { IllustrationKey } from "@/lib/exerciseTypes";

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
      viewBox="0 0 120 80"
      className={`stretch-illustration ${className}`.trim()}
      aria-hidden
    >
      {renderIllustration(illustration as IllustrationKey)}
    </svg>
  );
}

function renderIllustration(key: IllustrationKey) {
  const stroke = "var(--color-text-muted)";
  const fill = "var(--color-bg-soft)";

  switch (key) {
    case "neck-tilt":
      return (
        <>
          <circle cx="60" cy="18" r="8" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="60" y1="26" x2="60" y2="50" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="18" x2="48" y2="24" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "neck-flex":
      return (
        <>
          <circle cx="60" cy="22" r="8" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="60" y1="30" x2="60" y2="55" stroke={stroke} strokeWidth="2" />
          <path d="M 60 18 Q 55 28 60 32" fill="none" stroke={stroke} strokeWidth="1.5" />
        </>
      );
    case "neck-rotate":
      return (
        <>
          <circle cx="68" cy="20" r="8" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="64" y1="28" x2="56" y2="52" stroke={stroke} strokeWidth="2" />
          <path d="M 72 16 Q 78 20 74 26" fill="none" stroke={stroke} strokeWidth="1.5" />
        </>
      );
    case "shoulder-cross":
      return (
        <>
          <circle cx="60" cy="16" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="60" y1="23" x2="60" y2="48" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="30" x2="38" y2="38" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="30" x2="82" y2="34" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "shoulder-roll":
      return (
        <>
          <circle cx="60" cy="16" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="60" y1="23" x2="60" y2="50" stroke={stroke} strokeWidth="2" />
          <path d="M 44 28 Q 60 18 76 28" fill="none" stroke={stroke} strokeWidth="1.5" />
        </>
      );
    case "chest-doorway":
      return (
        <>
          <rect x="20" y="10" width="8" height="60" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <circle cx="70" cy="18" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="70" y1="25" x2="70" y2="50" stroke={stroke} strokeWidth="2" />
          <line x1="70" y1="32" x2="48" y2="22" stroke={stroke} strokeWidth="2" />
          <line x1="70" y1="32" x2="92" y2="22" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "chest-clasp":
      return (
        <>
          <circle cx="60" cy="18" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="60" y1="25" x2="60" y2="52" stroke={stroke} strokeWidth="2" />
          <path d="M 48 36 Q 60 44 72 36" fill="none" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "upper-child":
      return (
        <>
          <ellipse cx="60" cy="58" rx="22" ry="10" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <circle cx="60" cy="28" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="60" y1="35" x2="60" y2="50" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="40" x2="34" y2="52" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="40" x2="86" y2="52" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "upper-cat":
      return (
        <>
          <path d="M 30 55 Q 60 40 90 55" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="60" cy="32" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="48" y1="42" x2="38" y2="52" stroke={stroke} strokeWidth="2" />
          <line x1="72" y1="42" x2="82" y2="52" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "upper-twist":
      return (
        <>
          <ellipse cx="60" cy="58" rx="24" ry="8" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <circle cx="60" cy="28" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="60" y1="35" x2="60" y2="52" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="40" x2="84" y2="30" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "upper-puppy":
      return (
        <>
          <circle cx="44" cy="30" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="50" y1="34" x2="70" y2="48" stroke={stroke} strokeWidth="2" />
          <line x1="70" y1="48" x2="88" y2="58" stroke={stroke} strokeWidth="2" />
          <line x1="70" y1="48" x2="52" y2="58" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "arm-overhead":
      return (
        <>
          <circle cx="60" cy="42" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="60" y1="49" x2="60" y2="68" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="52" x2="44" y2="18" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="52" x2="76" y2="58" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "arm-wall":
      return (
        <>
          <rect x="14" y="8" width="6" height="64" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <circle cx="58" cy="22" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="58" y1="29" x2="58" y2="58" stroke={stroke} strokeWidth="2" />
          <line x1="58" y1="36" x2="20" y2="36" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "core-side":
      return (
        <>
          <circle cx="60" cy="22" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="60" y1="29" x2="60" y2="58" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="34" x2="60" y2="12" stroke={stroke} strokeWidth="2" />
          <path d="M 60 40 Q 78 48 60 58" fill="none" stroke={stroke} strokeWidth="1.5" />
        </>
      );
    case "core-cobra":
      return (
        <>
          <ellipse cx="60" cy="62" rx="28" ry="8" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <path d="M 34 58 Q 60 30 86 58" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="78" cy="38" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
        </>
      );
    case "lower-knee-chest":
      return (
        <>
          <line x1="30" y1="62" x2="90" y2="62" stroke={stroke} strokeWidth="1.5" />
          <circle cx="48" cy="40" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="54" y1="44" x2="68" y2="58" stroke={stroke} strokeWidth="2" />
          <path d="M 62 50 Q 72 42 78 58" fill="none" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "lower-twist":
      return (
        <>
          <line x1="28" y1="62" x2="92" y2="62" stroke={stroke} strokeWidth="1.5" />
          <circle cx="50" cy="36" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <path d="M 56 44 L 78 52 L 70 62 L 48 54 Z" fill={fill} stroke={stroke} strokeWidth="1.5" />
        </>
      );
    case "hip-lunge":
      return (
        <>
          <circle cx="52" cy="20" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="52" y1="27" x2="52" y2="48" stroke={stroke} strokeWidth="2" />
          <line x1="52" y1="48" x2="38" y2="62" stroke={stroke} strokeWidth="2" />
          <line x1="52" y1="48" x2="78" y2="62" stroke={stroke} strokeWidth="2" />
          <circle cx="78" cy="62" r="4" fill={fill} stroke={stroke} strokeWidth="1.5" />
        </>
      );
    case "hip-pigeon":
      return (
        <>
          <circle cx="44" cy="24" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="50" y1="30" x2="62" y2="48" stroke={stroke} strokeWidth="2" />
          <line x1="62" y1="48" x2="48" y2="58" stroke={stroke} strokeWidth="2" />
          <line x1="62" y1="48" x2="92" y2="58" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "hip-butterfly":
      return (
        <>
          <circle cx="60" cy="22" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="60" y1="29" x2="60" y2="46" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="46" x2="38" y2="62" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="46" x2="82" y2="62" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "glute-figure4":
      return (
        <>
          <line x1="28" y1="62" x2="92" y2="62" stroke={stroke} strokeWidth="1.5" />
          <circle cx="48" cy="36" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="54" y1="42" x2="68" y2="56" stroke={stroke} strokeWidth="2" />
          <line x1="62" y1="48" x2="82" y2="40" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "groin-frog":
      return (
        <>
          <circle cx="60" cy="28" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="60" y1="35" x2="60" y2="48" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="48" x2="32" y2="58" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="48" x2="88" y2="58" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "groin-straddle":
      return (
        <>
          <circle cx="60" cy="20" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="60" y1="27" x2="60" y2="42" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="42" x2="30" y2="62" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="42" x2="90" y2="62" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "quad-standing":
      return (
        <>
          <circle cx="56" cy="16" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="56" y1="23" x2="56" y2="50" stroke={stroke} strokeWidth="2" />
          <line x1="56" y1="50" x2="44" y2="66" stroke={stroke} strokeWidth="2" />
          <path d="M 56 50 Q 72 40 78 28" fill="none" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "hamstring-fold":
      return (
        <>
          <circle cx="60" cy="48" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="60" y1="55" x2="60" y2="66" stroke={stroke} strokeWidth="2" />
          <path d="M 60 55 L 44 20" stroke={stroke} strokeWidth="2" />
          <path d="M 60 55 L 76 20" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "it-band":
      return (
        <>
          <circle cx="54" cy="18" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="54" y1="25" x2="54" y2="52" stroke={stroke} strokeWidth="2" />
          <line x1="54" y1="52" x2="44" y2="66" stroke={stroke} strokeWidth="2" />
          <line x1="54" y1="52" x2="72" y2="66" stroke={stroke} strokeWidth="2" />
          <path d="M 54 30 Q 70 36 62 48" fill="none" stroke={stroke} strokeWidth="1.5" />
        </>
      );
    case "calf-wall":
      return (
        <>
          <rect x="14" y="8" width="6" height="64" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <circle cx="54" cy="20" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="54" y1="27" x2="54" y2="52" stroke={stroke} strokeWidth="2" />
          <line x1="54" y1="52" x2="54" y2="66" stroke={stroke} strokeWidth="2" />
          <line x1="54" y1="52" x2="78" y2="66" stroke={stroke} strokeWidth="2" />
        </>
      );
    case "ankle-flex":
      return (
        <>
          <line x1="40" y1="62" x2="80" y2="62" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="62" x2="60" y2="42" stroke={stroke} strokeWidth="2" />
          <path d="M 60 42 L 72 36 L 60 30" fill="none" stroke={stroke} strokeWidth="2" />
        </>
      );
    default:
      return (
        <>
          <circle cx="60" cy="24" r="8" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="60" y1="32" x2="60" y2="58" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="40" x2="42" y2="52" stroke={stroke} strokeWidth="2" />
          <line x1="60" y1="40" x2="78" y2="52" stroke={stroke} strokeWidth="2" />
        </>
      );
  }
}

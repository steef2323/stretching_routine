"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import StretchIllustration from "@/components/StretchIllustration";
import {
  BREAK_DURATION,
  JIGGLE_DURATION,
  PREP_DURATION,
  SET_DURATION,
} from "@/lib/constants";
import { playChime } from "@/lib/chime";
import { getEffectiveRoutine } from "@/lib/customRoutines";
import { getRoutine, type Routine, type RoutineId } from "@/lib/routines";
import { saveSession } from "@/lib/storage";

type Phase = "prep" | "set1" | "jiggle" | "set2" | "break";

interface SessionProps {
  routineId: RoutineId;
  isAnyway: boolean;
}

export default function Session({ routineId, isAnyway }: SessionProps) {
  const router = useRouter();
  const [routine, setRoutine] = useState<Routine>(() => getRoutine(routineId));
  const totalStretches = routine.stretches.length;

  const [phase, setPhase] = useState<Phase>("prep");
  const [stretchIndex, setStretchIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PREP_DURATION);

  const sessionRef = useRef({ phase: "prep" as Phase, stretchIndex: 0 });
  const finishedRef = useRef(false);
  const advancedAtZeroRef = useRef(false);

  useEffect(() => {
    setRoutine(getEffectiveRoutine(routineId));
  }, [routineId]);

  useEffect(() => {
    sessionRef.current = { phase, stretchIndex };
  }, [phase, stretchIndex]);

  const finishSession = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    saveSession(routineId);
    const params = new URLSearchParams({
      routine: routineId,
      anyway: isAnyway ? "1" : "0",
    });
    router.push(`/complete?${params.toString()}`);
  }, [routineId, isAnyway, router]);

  const advancePhase = useCallback(() => {
    if (finishedRef.current) return;

    const { phase: currentPhase, stretchIndex: index } = sessionRef.current;
    const isLastStretch = index >= totalStretches - 1;

    switch (currentPhase) {
      case "prep":
        setPhase("set1");
        setSecondsLeft(SET_DURATION);
        break;
      case "set1":
        playChime();
        setPhase("jiggle");
        setSecondsLeft(JIGGLE_DURATION);
        break;
      case "jiggle":
        playChime();
        setPhase("set2");
        setSecondsLeft(SET_DURATION);
        break;
      case "set2":
        if (isLastStretch) {
          finishSession();
        } else {
          setPhase("break");
          setSecondsLeft(BREAK_DURATION);
        }
        break;
      case "break":
        setStretchIndex(index + 1);
        setPhase("set1");
        setSecondsLeft(SET_DURATION);
        break;
    }
  }, [finishSession, totalStretches]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (secondsLeft !== 0) {
      advancedAtZeroRef.current = false;
      return;
    }
    if (finishedRef.current || advancedAtZeroRef.current) return;
    advancedAtZeroRef.current = true;
    advancePhase();
  }, [secondsLeft, advancePhase]);

  const stretch = routine.stretches[stretchIndex];
  const setLabel =
    phase === "set1" ? "Set 1" : phase === "set2" ? "Set 2" : null;

  function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  if (!stretch && phase !== "prep" && phase !== "jiggle" && phase !== "break") {
    return (
      <div className="screen screen-session">
        <p className="session-hint">Add stretches in Select my exercises first.</p>
      </div>
    );
  }

  if (phase === "prep") {
    return (
      <div className="screen screen-session">
        <p className="session-label">Get ready</p>
        <p className="timer timer-large">
          {secondsLeft > 0 ? secondsLeft : "Go"}
        </p>
      </div>
    );
  }

  if (phase === "jiggle") {
    return (
      <div className="screen screen-jiggle">
        <p className="jiggle-timer">{secondsLeft}</p>
        <p className="jiggle-text">give it a little jiggle</p>
      </div>
    );
  }

  if (phase === "break") {
    return (
      <div className="screen screen-session">
        <p className="session-label">Breathe</p>
        <p className="timer timer-large">{secondsLeft}</p>
        <p className="session-hint">Next stretch coming up</p>
      </div>
    );
  }

  return (
    <div className="screen screen-session">
      <div className="session-top">
        <p className="session-progress">
          {stretchIndex + 1} / {totalStretches}
        </p>
        {setLabel && <p className="session-set">{setLabel}</p>}
      </div>
      <p className="timer">{formatTime(secondsLeft)}</p>
      <div className="stretch-info">
        <StretchIllustration
          illustration={stretch.illustration}
          className="stretch-info-illustration"
        />
        <h2 className="stretch-name">{stretch.name}</h2>
        <p className="stretch-focus">{stretch.focus}</p>
        <p className="stretch-cue">{stretch.cue}</p>
        <p className="stretch-explanation">{stretch.explanation}</p>
      </div>
    </div>
  );
}

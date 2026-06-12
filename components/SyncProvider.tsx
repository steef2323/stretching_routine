"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import {
  activateCloudSync,
  deactivateCloudSync,
  hydrateFromCloud,
  registerCloudPushOnSave,
} from "@/lib/syncClient";

registerCloudPushOnSave();

export default function SyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, isLoaded } = useAuth();
  const lastUser = useRef<boolean | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const wasSignedIn = lastUser.current;
    lastUser.current = Boolean(isSignedIn);

    if (!isSignedIn) {
      deactivateCloudSync();
      return;
    }

    activateCloudSync();

    if (wasSignedIn === false || wasSignedIn === null) {
      void hydrateFromCloud();
    }
  }, [isSignedIn, isLoaded]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    function refreshFromCloud() {
      void hydrateFromCloud();
    }

    function onVisibilityChange() {
      if (document.visibilityState === "visible") {
        refreshFromCloud();
      }
    }

    window.addEventListener("focus", refreshFromCloud);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("focus", refreshFromCloud);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isLoaded, isSignedIn]);

  return children;
}

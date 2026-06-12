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

    if (wasSignedIn === false || wasSignedIn === null) {
      void hydrateFromCloud();
      return;
    }

    activateCloudSync();
  }, [isSignedIn, isLoaded]);

  return children;
}

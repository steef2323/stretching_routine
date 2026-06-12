import type { RoutineId } from "./routines";
import type { SessionRecord } from "./storage";

export interface CloudSyncPayload {
  stretchDays: number[];
  routines: Record<RoutineId, (string | null)[]>;
  sessions: SessionRecord[];
}

export interface CloudSyncResponse extends CloudSyncPayload {
  hasServerData: boolean;
}

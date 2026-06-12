import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/server/db";
import { fetchUserData, saveUserData } from "@/lib/server/userData";
import type { CloudSyncPayload } from "@/lib/syncTypes";
import type { RoutineId } from "@/lib/routines";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Cloud sync is not configured yet" },
      { status: 503 }
    );
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await fetchUserData(userId);
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/sync failed:", error);
    return NextResponse.json({ error: "Failed to load cloud data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Cloud sync is not configured yet" },
      { status: 503 }
    );
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as CloudSyncPayload;

    if (!isValidPayload(body)) {
      return NextResponse.json({ error: "Invalid sync payload" }, { status: 400 });
    }

    await saveUserData(userId, body);
    const data = await fetchUserData(userId);
    return NextResponse.json(data);
  } catch (error) {
    console.error("POST /api/sync failed:", error);
    return NextResponse.json({ error: "Failed to save cloud data" }, { status: 500 });
  }
}

function isValidPayload(body: CloudSyncPayload): boolean {
  if (!body || !Array.isArray(body.stretchDays) || !Array.isArray(body.sessions)) {
    return false;
  }

  if (!body.routines) return false;

  const ids: RoutineId[] = ["monday", "wednesday", "friday"];
  return ids.every(
    (id) => Array.isArray(body.routines[id]) && body.routines[id].length <= 5
  );
}

import { neon } from "@neondatabase/serverless";

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured");
  }
  return neon(url);
}

let schemaReady: Promise<void> | null = null;

export async function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = initSchema();
  }
  await schemaReady;
}

async function initSchema(): Promise<void> {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS user_settings (
      user_id TEXT PRIMARY KEY,
      stretch_days JSONB NOT NULL DEFAULT '[1,3,5]',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS user_routines (
      user_id TEXT NOT NULL,
      routine_id TEXT NOT NULL,
      slots JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (user_id, routine_id)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS stretch_sessions (
      user_id TEXT NOT NULL,
      session_date DATE NOT NULL,
      routine_id TEXT NOT NULL,
      is_scheduled_day BOOLEAN NOT NULL,
      completed_at TIMESTAMPTZ NOT NULL,
      PRIMARY KEY (user_id, session_date)
    )
  `;
}

-- Run once in Neon SQL editor (tables are also auto-created on first sync)

CREATE TABLE IF NOT EXISTS user_settings (
  user_id TEXT PRIMARY KEY,
  stretch_days JSONB NOT NULL DEFAULT '[1,3,5]',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_routines (
  user_id TEXT NOT NULL,
  routine_id TEXT NOT NULL,
  slots JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, routine_id)
);

CREATE TABLE IF NOT EXISTS stretch_sessions (
  user_id TEXT NOT NULL,
  session_date DATE NOT NULL,
  routine_id TEXT NOT NULL,
  is_scheduled_day BOOLEAN NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (user_id, session_date)
);

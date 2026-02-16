-- Settings/Preferences table (identifier with slash requires quoted name)
-- Table name: settings_/_preferences per spec; use quoted identifier in PostgreSQL.

CREATE TABLE IF NOT EXISTS "settings_/_preferences" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE "settings_/_preferences" ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "settings_preferences_read_own" ON "settings_/_preferences"
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY "settings_preferences_insert_own" ON "settings_/_preferences"
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY "settings_preferences_update_own" ON "settings_/_preferences"
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own data
CREATE POLICY "settings_preferences_delete_own" ON "settings_/_preferences"
  FOR DELETE USING (auth.uid() = user_id);

-- Optional: trigger to keep updated_at in sync
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS settings_preferences_updated_at ON "settings_/_preferences";
CREATE TRIGGER settings_preferences_updated_at
  BEFORE UPDATE ON "settings_/_preferences"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

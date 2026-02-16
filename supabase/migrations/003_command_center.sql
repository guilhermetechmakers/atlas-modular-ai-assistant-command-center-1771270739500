-- Command Center dashboard table (identifier with slash requires quoted name)
-- Table name: dashboard_/_command_center per spec; use quoted identifier in PostgreSQL.

CREATE TABLE IF NOT EXISTS "dashboard_/_command_center" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE "dashboard_/_command_center" ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "dashboard_command_center_read_own" ON "dashboard_/_command_center"
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY "dashboard_command_center_insert_own" ON "dashboard_/_command_center"
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY "dashboard_command_center_update_own" ON "dashboard_/_command_center"
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own data
CREATE POLICY "dashboard_command_center_delete_own" ON "dashboard_/_command_center"
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger to keep updated_at in sync
DROP TRIGGER IF EXISTS dashboard_command_center_updated_at ON "dashboard_/_command_center";
CREATE TRIGGER dashboard_command_center_updated_at
  BEFORE UPDATE ON "dashboard_/_command_center"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

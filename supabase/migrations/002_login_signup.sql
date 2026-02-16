-- Login/Signup scope table (identifier with slash requires quoted name)
-- Table name: login_/_signup per spec; use quoted identifier in PostgreSQL.

CREATE TABLE IF NOT EXISTS "login_/_signup" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE "login_/_signup" ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "login_signup_read_own" ON "login_/_signup"
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY "login_signup_insert_own" ON "login_/_signup"
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY "login_signup_update_own" ON "login_/_signup"
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own data
CREATE POLICY "login_signup_delete_own" ON "login_/_signup"
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger to keep updated_at in sync (reuses function from 001 if present)
DROP TRIGGER IF EXISTS login_signup_updated_at ON "login_/_signup";
CREATE TRIGGER login_signup_updated_at
  BEFORE UPDATE ON "login_/_signup"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

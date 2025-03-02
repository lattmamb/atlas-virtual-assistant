
-- Add openrouter column to api_keys table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'api_keys' AND column_name = 'openrouter') THEN
        ALTER TABLE api_keys ADD COLUMN openrouter TEXT;
    END IF;
END $$;

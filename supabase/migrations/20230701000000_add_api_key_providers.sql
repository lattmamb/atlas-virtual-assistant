
-- Add missing columns to api_keys table if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'api_keys' AND column_name = 'anthropic') THEN
        ALTER TABLE api_keys ADD COLUMN anthropic TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'api_keys' AND column_name = 'google') THEN
        ALTER TABLE api_keys ADD COLUMN google TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'api_keys' AND column_name = 'cohere') THEN
        ALTER TABLE api_keys ADD COLUMN cohere TEXT;
    END IF;
END $$;

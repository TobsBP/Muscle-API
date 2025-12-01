import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'http://localhost'
const supabaseKey = process.env.SUPABASE_KEY || 'test-key'

export const supabase = createClient(supabaseUrl, supabaseKey)
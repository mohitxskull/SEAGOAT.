import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;

export const Supabase = createClient(supabaseUrl!, supabaseAnonKey!);

export const SupabaseService = createClient(supabaseUrl!, supabaseServiceKey!);

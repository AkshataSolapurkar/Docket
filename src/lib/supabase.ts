// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  {
    auth: {
      // ← auto‐parse the #access_token=… fragment on page load
      detectSessionInUrl: true,
      // ← persist session to localStorage
      persistSession: true,
    },
  }
);

export default supabase;
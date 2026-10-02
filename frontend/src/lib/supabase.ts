/**
 * Supabase Browser Client
 *
 * Client-side bileşenlerde kullanılır (auth, realtime vb.).
 * RLS kurallarına uyar (anon key kullanır).
 *
 * Kullanım:
 *   import { supabase } from '@/lib/supabase'
 *   const { data } = await supabase.from('table').select('*')
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY tanımlanmalı.',
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

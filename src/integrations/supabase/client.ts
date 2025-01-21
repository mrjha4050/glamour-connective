import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://njpkzpylcvzlxggamwgs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qcGt6cHlsY3Z6bHhnZ2Ftd2dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTg1NzAsImV4cCI6MjAyNTIzNDU3MH0.ZNdv8JHqc_YD_6Wz4EFR_YLw3_xTJ7SvqYtUGGYbBvw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});
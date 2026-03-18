import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL or Anon Key is missing in environment variables. Please check your .env file.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    supabaseUrl || 'https://vxcdkvwvoiwxhjmhfqyd.supabase.co',
    supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4Y2Rrdnd2b2l3eGhqbWhmcXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MTAwNjAsImV4cCI6MjA4OTM4NjA2MH0.SWDabYxanqssGf4x-6hnf573A3jTOcOCTUlmV7R-P68'
);

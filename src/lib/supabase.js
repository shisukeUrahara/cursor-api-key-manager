import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://idieltfubhuwpprrhljm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkaWVsdGZ1Ymh1d3BwcnJobGptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4NDk5ODYsImV4cCI6MjA0NzQyNTk4Nn0.6XmMEieRDfdIHcAxawli7S2ZY4qJvlWHriAYmYN-w-Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
}) 
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://fxryyzmtfkbrkkmfhryj.supabase.co"   // ✅ kendi Supabase URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cnl5em10ZmticmtrbWZocnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODU0OTAsImV4cCI6MjA3NTA2MTQ5MH0.EeALGW4bZbfTNEWxsg7H8939QAZveLvAzwnxcXCyhY4"   // ✅ kendi anon public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

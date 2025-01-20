/** @format */

import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SUPABASE_URL = "https://otjallrrjnhzwmmxhopv.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90amFsbHJyam5oendtbXhob3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDczNjQsImV4cCI6MjA1MjUyMzM2NH0.JKMHCJUpjNJJy9A0cXGOgyjnANDkIQqrfdyqlwsgvZU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

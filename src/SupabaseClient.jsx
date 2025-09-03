import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUP_URL
const supabaseKey = import.meta.env.VITE_SUP_KEY
// creating a connection to the Resful endpoint of my Supabase project
export const supabase = createClient(supabaseUrl, supabaseKey)

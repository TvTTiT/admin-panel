// supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jtvdhvxbwqnfcwquzclb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0dmRodnhid3FuZmN3cXV6Y2xiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTg5NDMwNSwiZXhwIjoyMDE3NDcwMzA1fQ.Ek1s5I9ndtjwIvopk9de12EErbWTAk8bw2YS6yxcQdk';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

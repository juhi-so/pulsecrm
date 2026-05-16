import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://kaaxyyiitmqcrpvojrsv.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthYXh5eWlpdG1xY3Jwdm9qcnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MjM1MTQsImV4cCI6MjA5NDM5OTUxNH0.BsF4D1CeeN7aEYNeS9gwATpZ719GvEqDl0_gg4oghSE";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
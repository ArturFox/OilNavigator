import { supabase } from "../../../shared/api/supabase/client";


export const getBrigades = async () => {
  const { data, error } = await supabase
    .from("brigades")
    .select("*");

  if (error) throw error;

  return data ?? [];
};
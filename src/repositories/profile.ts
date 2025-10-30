import { supabase } from "../config/supabase";
import type { ZodUUID } from "zod";

export const getPeopleInfos = async () => {
  return await supabase
    .from('user_profiles')
    .select('*')
}

export const getPersonInfos = async(id:ZodUUID) => {
  return await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .single()
}

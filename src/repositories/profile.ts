import { supabase } from "../config/supabase";
import type { ZodUUID } from "zod";

export async function getPeopleInfos(){
  return await supabase
    .from('user_profiles')
    .select('*')
}

export async function getPersonInfos(id:ZodUUID){
  return await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .single()
}

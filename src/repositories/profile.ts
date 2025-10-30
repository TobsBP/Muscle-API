import { supabase } from "../config/supabase";

export const getUsersProfiles = async () => {
  return await supabase
    .from('user_profiles')
    .select('*')
}

export const getUserProfile = async(id: string) => {
  return await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .single()
}

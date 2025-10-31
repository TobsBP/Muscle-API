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

export const updateUserProfile = async (id: string, profile: any) => {
    return await supabase
    .from('user_profiles')
    .update(profile)
    .eq('id', id)
}

export const deleteUserProfile = async (id: string) => {
    return await supabase
    .from('user_profiles')
    .delete()
    .eq('id', id)
}

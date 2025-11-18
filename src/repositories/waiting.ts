import { supabase } from "../config/supabase";

export const getWaitingList = async (userId: string) => {
  return await supabase
    .from("waiting_list")
    .select("*")
    .eq("user_id", userId)
};

export const updateWaitingStatus = async (userId: string, status: boolean) => {
  return await supabase
    .from("waiting_list")
    .update({ waiting: status })
    .eq("user_id", userId)
    .select() 
    .single();
};
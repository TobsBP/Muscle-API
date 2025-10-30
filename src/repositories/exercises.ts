import { supabase } from "../config/supabase";

export const getExercises = async () => {
  return await supabase
    .from('exercises')
    .select('*')
}

export const getExercise = async (id: number) => {
    return await supabase
    .from('exercises')
    .select('*')
    .eq('id', id)
    .single()
}
import { supabase } from "../config/supabase";

export async function getExercises(){
  return await supabase
    .from('exercises')
    .select('*')
}

export async function getExercise(id: number){
    return await supabase
    .from('exercises')
    .select('*')
    .eq('id', id)
    .single()
}
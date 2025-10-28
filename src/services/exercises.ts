import { supabase } from "./supabase";

export async function getExercises(){
  const { data, error } = await supabase
    .from('exercises')
    .select('*')

  if (error)
    throw new Error(error.message);

  return data;
}

export async function getExercise(id: number){
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('id', id)
    .single()

  if (error)
    throw new Error(error.message);

  return data;
}
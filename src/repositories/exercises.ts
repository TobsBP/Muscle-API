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

export const updateExercise = async (id: number, exercise: any) => {
    return await supabase
    .from('exercises')
    .update(exercise)
    .eq('id', id)
}

export const deleteExercise = async (id: number) => {
    return await supabase
    .from('exercises')
    .delete()
    .eq('id', id)
}
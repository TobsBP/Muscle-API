import { supabase } from "../config/supabase";

export const getTrainingSheet = async (id: string) => {
  return await supabase
    .from('user_profiles')
    .select(`
      id,
      training_sheets (
        id,
        title,
        training_sheet_exercises (
          id,
          name,
          sets,
          reps,
          wheight
        ) 
      )
    `)
  .eq('user_id', id)
}

export const deleteTrainingSheet = async (id: string) => {
  return await supabase
    .from('user_profiles')
    .select(`
      id,
      training_sheets (
        id,
        title,
        training_sheet_exercises (
          id,
          name,
          sets,
          reps,
          wheight
        ) 
      )
    `)
  .eq('user_id', id)
}
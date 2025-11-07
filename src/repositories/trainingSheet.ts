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

export const createTrainingSheet = async (sheetData: { user_id: string; title: string; exercises: any[] }) => {
  const { data, error } = await supabase
    .from('training_sheets')
    .insert({ user_id: sheetData.user_id, title: sheetData.title })
    .select('id')
    .single();

  if (error || !data) {
    throw new Error('Failed to create training sheet');
  }

  const sheetId = data.id;
  const exercisesToInsert = sheetData.exercises.map(ex => ({ ...ex, training_sheet_id: sheetId }));

  return await supabase
    .from('training_sheet_exercises')
    .insert(exercisesToInsert)
    .select();
}

export const deleteTrainingSheet = async (id: string) => {
  return await supabase
    .from('training_sheets')
    .delete()
    .eq('id', id)
}
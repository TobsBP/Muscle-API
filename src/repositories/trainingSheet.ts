import { supabase } from "../config/supabase";

export const getTrainingSheets = async (userId: string) => {
  return await supabase
    .from("training_sheets")
    .select(`
      id,
      title,
      training_sheet_exercises (
        id,
        name,
        sets,
        reps,
        weight
      )
    `)
    .eq("user_id", userId);
};

export const createTrainingSheet = async (sheetData: { userId: string; title: string; exercises: any[] }) => {
  const { data, error } = await supabase
    .from("training_sheets")
    .insert({ user_id: sheetData.userId, title: sheetData.title })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error("Failed to create training sheet");
  }

  const sheetId = data.id;
  const exercisesToInsert = sheetData.exercises.map(ex => ({
    ...ex,
    training_sheet_id: sheetId,
  }));

  return await supabase
    .from("training_sheet_exercises")
    .insert(exercisesToInsert)
    .select();
};

export const deleteTrainingSheet = async (sheetId: string, userId: string) => {
  return await supabase
    .from("training_sheets")
    .delete()
    .eq("id", sheetId)
    .eq("user_id", userId);
};

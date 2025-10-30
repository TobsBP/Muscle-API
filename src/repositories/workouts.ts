import { supabase } from "../config/supabase";

export const getWorkout = async (id: number) => {
  return await supabase
  .from("daily_workouts")
  .select(`
    id,
    workout_date,
    workout_date_exercises,
    *`)
  .eq('id', id)
  .single()
}

export const getWorkouts = async () => {
  return await supabase
    .from("daily_workout_exercises")
    .select(`
      id,
      position,
      daily_workout_id,
      exercises (
        id,
        name,
        description
      )
    `)
}
import { supabase } from "../config/supabase";

export const getWorkouts = async () => {
  return await supabase
  .from("daily_workouts")
  .select(`
    id,
    workout_date,
    workout_date_exercises,
    *`)
}

export const getWorkout = async (id: string) => {
  return await supabase
    .from("daily_workouts")
    .select(`
      id,
      workout_date,
      daily_workout_exercises(
        id,
        exercise_id,
        position,
        sets,
        reps,
        exercises(
          id,
          name,
          description,
          difficulty,
          duration_minutes
        )
      )
    `)
  .eq('user_id', id)
  .single()
}

export const updateWorkout = async (id: number, workout: any) => {
    return await supabase
    .from('daily_workouts')
    .update(workout)
    .eq('id', id)
}

export const deleteWorkout = async (id: number) => {
    return await supabase
    .from('daily_workouts')
    .delete()
    .eq('id', id)
}
import type { profileSchema } from "../types/profileSchema";
import type { userSchema } from "../types/userSchema";
import { supabase } from "../config/supabase";
import type { z } from "zod";

type UserSchema = z.infer<typeof userSchema>;
type ProfileSchema = z.infer<typeof profileSchema>;

export async function signUp(formData: UserSchema) {
  return await supabase.auth.signUp({
    email: formData.email.trim().toLowerCase(),
    password: formData.password,
  });
}

export async function createProfile(formData: ProfileSchema, userId: string) {
  const profileData = {
    id: userId,
    ...formData,
    name: formData.name.trim(),
    goal: formData.goal.trim(),
  };

  return await supabase.from("user_profiles").insert([profileData]);
}

export async function signIn(formData: Pick<UserSchema, "email" | "password">) {
  return await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });
}
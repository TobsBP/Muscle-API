import type { z } from "zod";
import { createProfile as createProfileRepo, signIn as signInRepo, signUp as signUpRepo } from "../repositories/auth";
import type { profileSchema } from "../types/profileSchema";
import type { userSchema } from "../types/userSchema";

type UserSchema = z.infer<typeof userSchema>;
type ProfileSchema = z.infer<typeof profileSchema>;

export async function signUp(formData: UserSchema) {
  const { data, error } = await signUpRepo(formData);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createProfile(formData: ProfileSchema, userId: string) {
  const { data, error } = await createProfileRepo(formData, userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signIn(formData: Pick<UserSchema, "email" | "password">) {
  const { data, error } = await signInRepo(formData);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
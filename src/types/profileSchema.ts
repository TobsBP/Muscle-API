import z from 'zod';

export const profileSchema = z.object({
  name: z.string(),
  age: z.number(),
  gender: z.string(),
  goal: z.string(),
});

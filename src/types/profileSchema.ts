import z from 'zod';

export const profileSchema = z.object({
  name: z.string(),
  birth_date: z.string(),
  gender: z.string(),
  goal: z.string(),
});

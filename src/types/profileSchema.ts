import z from "zod";

const parseNumber = (v: any) => {
  if (!v) return 0;
  const num = Number(String(v).replace(',', '.'));
  return isNaN(num) ? 0 : num;
};

export const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  birth_date: z.string().min(10, "Data de nascimento inválida"),
  height_cm: z.preprocess(parseNumber, z.number().positive("Altura deve ser positiva")),
  weight_kg: z.preprocess(parseNumber, z.number().positive("Peso deve ser positivo")),
  gender: z.string().min(1, "Gênero é obrigatório"),
  fitness_level: z.string().min(1, "Nível de fitness é obrigatório"),
  goal: z.string().min(1, "Objetivo é obrigatório").max(100, "Objetivo muito longo"),
});

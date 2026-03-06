import { z } from "zod";

export const signInSchema = z.object({
  
    email: z.string()
    .trim()
    .min(5, "Слишком короткий email")
    .email("Введите корректный email")
    ,

    password: z.string()
        .min(8, "Минимум 8 символов")
    ,
});

export type SignInSchema = z.infer<typeof signInSchema>;
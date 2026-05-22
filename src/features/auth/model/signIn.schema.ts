//src/components/signIn/signIn.schema.ts

import { z } from "zod";

export const signInForm = z.object({
  
    email: z.string()
    .trim()
    .min(5, "Слишком короткий email")
    .email("Введите корректный email")
    ,

    password: z.string()
        .min(8, "Минимум 8 символов")
    ,
});

export type SignInSchema = z.infer<typeof signInForm>;
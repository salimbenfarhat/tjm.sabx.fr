// src/lib/validators/user.ts
import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
  name: z.string().min(2).max(50).optional(),
});
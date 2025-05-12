import { z } from "zod";

export const resetEmailSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
});
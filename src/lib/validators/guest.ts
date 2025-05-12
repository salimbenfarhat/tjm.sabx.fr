// src/lib/validators/guest.ts
import { z } from "zod";

export const guestUsageSchema = z.object({
  guestId: z.string().uuid({ message: "Identifiant invité invalide" }),
  ip: z.string().optional(),
});
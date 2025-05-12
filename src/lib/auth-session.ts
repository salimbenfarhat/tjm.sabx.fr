// src/lib/auth-session.ts
import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "./auth";

export const getSession = cache(async () => {
  const h = await headers(); // ✅ obligatoire
  return await auth.api.getSession({ headers: h });
});
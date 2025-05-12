import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "./auth";
import { prisma } from "@/lib/prisma"; // adapte selon ton projet

export type SessionUser = {
  id: string;
  email: string;
  isPremium: boolean;
  name?: string;
  image?: string;
};

export const getSession = cache(async () => {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });

  if (!session) return null;

  const rawUser = session.user as Record<string, unknown>;
  const userId = rawUser.id as string;

  let isPremium = typeof rawUser.isPremium === "boolean" ? rawUser.isPremium : false;

  if (!isPremium && userId) {
    const userInDb = await prisma.user.findUnique({
      where: { id: userId },
      select: { isPremium: true },
    });

    if (userInDb?.isPremium) {
      isPremium = true;
    }
  }

  // ✅ Défini ici, donc dispo dans le return
  const user: SessionUser = {
    id: userId,
    email: rawUser.email as string,
    isPremium,
    name: rawUser.name as string | undefined,
    image: rawUser.image as string | undefined,
  };

  // ✅ Pas d’erreur ici car `user` existe bien
  return {
    ...session,
    user,
  };
});

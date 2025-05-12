import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parse } from "cookie";
import { guestUsageSchema } from "@/lib/validators/guest";

export async function POST(req: NextRequest) {
  const cookies = parse(req.headers.get("cookie") || "");
  const guestId = cookies["guest_id"];

  if (!guestId) {
    return NextResponse.json(
      { error: "Identifiant invité manquant" },
      { status: 400 }
    );
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0] ?? "unknown";

  const validation = guestUsageSchema.safeParse({ guestId, ip });

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors[0]?.message || "Données invalides" },
      { status: 400 }
    );
  }
  
  const today = new Date().toISOString().split("T")[0];

  const existing = await prisma.guestUsage.findFirst({
    where: {
      OR: [{ guestId }, { ip }],
      date: today,
    },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Limite journalière atteinte" },
      { status: 403 }
    );
  }

  await prisma.guestUsage.create({
    data: {
      guestId,
      ip,
      date: today,
    },
  });

  return NextResponse.json({ success: true });
}

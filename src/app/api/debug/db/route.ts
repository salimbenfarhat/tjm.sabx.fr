import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // simple test : count des lignes de guest_usage
    const count = await prisma.guestUsage.count();
    return NextResponse.json({ ok: true, guest_usage_count: count });
  } catch (error) {
    console.error("Erreur de connexion DB :", error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
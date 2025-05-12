import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const rawBody = await req.arrayBuffer(); // Next.js App Router
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Erreur signature Stripe", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // 🎯 Traitement de l’événement
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    if (!userId) {
      console.error("❌ Pas d'userId dans metadata");
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    try {
      await prisma.user.update({
        where: { id: userId },
        data: { isPremium: true },
      });

      console.log("✅ Utilisateur premium activé :", userId);
    } catch (e) {
      console.error("❌ Erreur lors de la mise à jour de l’utilisateur", e);
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

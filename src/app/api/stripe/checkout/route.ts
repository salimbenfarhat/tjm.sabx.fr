import Stripe from "stripe";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?status=cancel`,
    metadata: {
      userId: session.user.id,
    },
  });

  // 🔁 Redirection vers Stripe Checkout
  return NextResponse.redirect(checkout.url!, 303);
}

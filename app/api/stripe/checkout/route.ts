import Stripe from "stripe";
import { NextResponse } from "next/server";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY env var");
  }

return new Stripe(key);
}

type Plan = "monthly" | "yearly";

export async function POST(req: Request) {
  try {
    const stripe = getStripe();

    const body = await req.json();
    const plan: Plan = body?.plan;

    if (plan !== "monthly" && plan !== "yearly") {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const priceId =
      plan === "monthly"
        ? process.env.STRIPE_PRICE_PREMIUM_MONTHLY
        : process.env.STRIPE_PRICE_PREMIUM_PLUS_YEARLY;

    if (!priceId) {
      return NextResponse.json(
        {
          error:
            plan === "monthly"
              ? "Missing STRIPE_PRICE_PREMIUM_MONTHLY env var"
              : "Missing STRIPE_PRICE_PREMIUM_PLUS_YEARLY env var",
        },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/choose-plan?success=1&plan=${plan}`,
      cancel_url: `${appUrl}/choose-plan?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Checkout failed" },
      { status: 500 }
    );
  }
}

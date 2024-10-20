
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY as string;
const stripe = new Stripe(apiKey);

export const GET = async (request: NextRequest, response: NextResponse) => {
  const { searchParams } = new URL(request.url);

  const stripeSessionId = searchParams.get("session_id");


  if (!stripeSessionId?.length)
    return redirect("/");

  const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

  if (session.status === "complete") {
    // Go to a success page!
    return redirect(
      `/checkout/success`,
    );
  }

  if (session.status === "open") {
    // Here you'll likely want to head back to some pre-payment page in your checkout 
    // so the user can try again
    return redirect(
      `/checkout`,
    );
  }

  return redirect("/");
};
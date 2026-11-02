import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { userSubscription } from "@/db/schema";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unknown error";

      return new NextResponse(`Webhook error: ${message}`, {
        status: 400,
    });
  }
    const session = event.data.object as Stripe.Checkout.Session;

    if(event.type === "checkout.session.completed") {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

    if (!session?.metadata?.userId) {
      return new NextResponse("User ID is required", { status: 400});
    }

    await db.insert(userSubscription).values({
      userId: session.metadata.userId,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(
        subscription.items.data[0].current_period_end * 1000,
      ),
    });
  }

  if (event.type === "invoice.payment_succeeded") {
  const invoice = event.data.object as Stripe.Invoice;

  const subscriptionRef =
    invoice.parent?.subscription_details?.subscription;

  if (!subscriptionRef) {
    return new NextResponse(null, { status: 200 });
  }

  const subscriptionId =
    typeof subscriptionRef === "string"
      ? subscriptionRef
      : subscriptionRef.id;

  const subscription =
    await stripe.subscriptions.retrieve(subscriptionId);

  const item = subscription.items.data[0];

  if (!item) {
    return new NextResponse("Subscription item missing", {
      status: 500,
    });
  }

  await db
    .update(userSubscription)
    .set({
      stripePriceId: item.price.id,
      stripeCurrentPeriodEnd: new Date(
        item.current_period_end * 1000,
      ),
    })
    .where(
      eq(userSubscription.stripeSubscriptionId, subscription.id),
    );
}
  return new NextResponse(null, { status: 200 });
}
import { type NextApiRequest, type NextApiResponse } from "next";
import Stripe from "stripe";

import { env } from "~/env.mjs";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      if (paymentIntent.client_secret === null) {
        throw new Error("Invalid client secret.");
      }

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      console.error("err", err);
      if (err instanceof Stripe.errors.StripeAPIError) {
        res.status(err.statusCode || 500).json(err.message);
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

import twilio from "twilio";
import { z } from "zod";

import { env } from "../../env.mjs";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const twilioRouter = createTRPCRouter({
  createCallTwilio: publicProcedure
    .meta({ /* 👉 */ openapi: { method: "POST", path: "/create-call-twilio" } })
    .input(z.object({ audioURL: z.string(), to: z.string() })) //TODO: parse to as a phone number type
    .output(z.boolean())
    .mutation(async ({ input }) => {
      const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

      // The Twilio phone number to use as the caller ID
      const fromNumber = "+12762462620";

      // Make the phone call
      await client.calls.create({
        from: fromNumber,
        to: input.to,
        url: input.audioURL,
      });

      return true;
    }),
});

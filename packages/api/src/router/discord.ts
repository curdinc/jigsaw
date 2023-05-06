import { TRPCError } from "@trpc/server";
import { ZodError, z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

const emailSchema = z.string().email("Invalid email address");

export const discordRouter = createTRPCRouter({
  addToWaitlist: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const parsedEmail = emailSchema.parse(input.email);
        const resp = await fetch(
          "https://discord.com/api/webhooks/995630616873816094/AbmxDVB6Ohl6j3xOoDCB727THgyZot3hH7L9YrFzM6Mpda19mKu3qj3ndt9tIiC9fYm4",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: `Email: ${parsedEmail}`,
            }),
          },
        );
        if (resp.status !== 204) {
          const errorText = await resp.text();
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error processing webhook!",
            cause: errorText,
          });
        }
        return JSON.stringify({ success: "OK" });
      } catch (error) {
        if (error instanceof ZodError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid Email!",
          });
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An unknown error occurred!",
          });
        }
      }
    }),
});

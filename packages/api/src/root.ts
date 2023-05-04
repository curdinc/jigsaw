import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { twilioRouter } from "./router/twilio";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  twilio: twilioRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

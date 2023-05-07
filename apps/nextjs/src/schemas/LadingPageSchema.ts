import { z } from "zod";

export const LandingPageSchema = z.enum(["simple", "full"]);
export type LandingPageType = z.infer<typeof LandingPageSchema>;

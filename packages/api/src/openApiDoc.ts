import { generateOpenApiDocument } from "trpc-openapi";

import { env } from "../env.mjs";
import { appRouter } from "./root";

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Piecewise Planner API",
  version: "0.0.0",
  baseUrl: env.BASE_OPENAPI_URL,
});

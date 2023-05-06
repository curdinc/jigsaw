// pages/api/auth/[...auth0].js

import { type NextApiRequest, type NextApiResponse } from "next";
import { handleAuth } from "@auth0/nextjs-auth0";
import { z } from "zod";

import { env } from "~/env.mjs";

export default handleAuth({
  logout: (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { returnTo },
    } = req;
    try {
      const returnToParsed = z.string().parse(returnTo);

      res
        .redirect(
          `${env.AUTH0_ISSUER_BASE_URL}/v2/logout?${new URLSearchParams({
            client_id: env.AUTH0_CLIENT_ID,
            returnTo: returnToParsed,
          })}`,
        )
        .end();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        res.status(500).end(error.message);
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  },
});

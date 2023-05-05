// pages/api/auth/[...auth0].js

import { type NextApiRequest, type NextApiResponse } from "next";
import { handleAuth, handleLogout } from "@auth0/nextjs-auth0";
import { z } from "zod";

export default handleAuth({
  logout: async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      query: { returnTo },
    } = req;
    try {
      const returnToParsed = z.string().parse(returnTo);
      await handleLogout(req, res, {
        returnTo: returnToParsed,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        res.status(500).end(error.message);
      }
      res.status(500).json({ error: "Something went wrong" });
    }
  },
});

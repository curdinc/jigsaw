import { type NextApiRequest, type NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("req", req);
  console.log(req.query);
  res.status(200).redirect("/beta/home");
}

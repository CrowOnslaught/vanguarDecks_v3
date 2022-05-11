import { sessionConfig } from "config/sessionConfig";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(impersonateRoute, sessionConfig);

async function impersonateRoute(req: NextApiRequest, res: NextApiResponse) {
  if (!req.session.tokens) {
    res.redirect("/login");
  }
  res.json(req.session.tokens);
}

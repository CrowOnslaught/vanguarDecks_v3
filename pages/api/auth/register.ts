import { sessionConfig } from "config/sessionConfig";
import { withIronSessionApiRoute } from "iron-session/next";
import { registerUser } from "services/apiCards";
import type { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(impersonateRoute, sessionConfig);

async function impersonateRoute(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    res.status(400).send("No body");
    return;
  }

  try {
    const token = await registerUser({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    req.session.tokens = token;
    await req.session.save();

    return res.json({
      success: true,
      message: "Successfully registered",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
}

import { sessionConfig } from "config/sessionConfig";
import { withIronSessionApiRoute } from "iron-session/next";
import { getToken } from "lib/apiCards/services";
import type { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(impersonateRoute, sessionConfig);

async function impersonateRoute(req:NextApiRequest, res:NextApiResponse) {
  if (!req.body) {
    res.status(400).send("No body");
    return;
  }

  try {
    const token = await getToken({ email: req.body.email, password: req.body.password});
    req.session.tokens = token;
    await req.session.save();
    
    return res.json({
      success: true,
      message: "Successfully logged in",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: true,
      message: error.message
    });
  }
}
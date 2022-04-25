import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from 'next'
import { sessionConfig } from "config/sessionConfig";

export default withIronSessionApiRoute(impersonateRoute, sessionConfig);

async function impersonateRoute(req:NextApiRequest, res:NextApiResponse) {
    await req.session.destroy();
    res.writeHead(307, { Location: '/login' })
    res.end()
}
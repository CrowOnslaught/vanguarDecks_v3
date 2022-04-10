import { NextApiRequest, NextApiResponse } from 'next';
import { unsetAuthCookies } from 'next-firebase-auth';
import initAuth from 'helpers/initAuth';

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    await unsetAuthCookies(req, res);
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error.', message: e });
  }
  return res.status(200).json({ success: true });
};

export default handler;

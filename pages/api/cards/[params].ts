import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { query } = req;

  try {
    const data = await fetch(
      `https://card-fight-vanguard-api.ue.r.appspot.com/api/v1/cards?${query}`
    );

    const result = await data.json();
    console.log(result.data[0]);
    res.json(result);
  } catch {
    res.status(404).end();
  }
};

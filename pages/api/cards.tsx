import { NextApiRequest, NextApiResponse } from 'next';
import { objectToQueryString } from 'helpers/utils';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const { query } = req;
    const { page } = query;

    const data = await fetch(
      `${process.env.API_CARDS_URL}/api/cards/${
        page || 1
      }?${objectToQueryString(query)}`
    );
    const result = await data.json();
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

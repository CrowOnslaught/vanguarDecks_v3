import { NextApiRequest, NextApiResponse } from 'next';
import firestore from 'firebase/admin';

export default (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { query } = req;
  const { id } = query;

  firestore
    .collection('decks')
    .doc(id.toString())
    .get()
    .then(doc => {
      const data = doc.data();
      if (!data) res.status(404).end();

      res.json(data);
    })
    .catch(() => {
      res.status(404).end();
    });
};

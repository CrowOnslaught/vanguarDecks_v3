import { NextApiRequest, NextApiResponse } from 'next';
import firestore from 'firebase/admin';

export default (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { query } = req;
  const { user } = query;

  firestore
    .collection('decks')
    .where('user', '==', user)
    .get()
    .then(doc => {
      const data = doc.docs.map(e => e.data());
      if (!data) res.status(404).end();

      res.json(data);
    })
    .catch(() => {
      res.status(404).end();
    });
};

import type { NextApiRequest, NextApiResponse } from 'next';
import { FIRESTORE } from '../../utils/firebase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    let top_players_doc = null;
    let error = null;

    try {
      top_players_doc = await FIRESTORE.collection('OSU!DROID')
        .doc('TOP_PLAYERS')
        .get();
    } catch (err) {
      error = err;
    } finally {
      if (error || !top_players_doc || !top_players_doc.exists) {
        res.status(500).end();
      } else {
        const top_players_data = top_players_doc.data();
        res.status(200).send({ data: top_players_data });
      }
    }
  } else {
    res.status(400).end();
  }
};

import type { NextApiRequest, NextApiResponse } from 'next';
import { FIRESTORE } from '../../../utils/firebase';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  let top_players_doc = null;
  let error = null;

  try {
    top_players_doc = await FIRESTORE.collection('OSU!DROID')
      .doc('TOP_PLAYERS')
      .get();
  } catch (err) {
    error = err;
  } finally {
    if (error) {
      res.status(400).send({ status: 400 });
    } else {
      if (top_players_doc && top_players_doc.exists) {
        const top_players_data = top_players_doc.data();
        res.status(200).send({ status: 200, data: top_players_data });
      } else {
        res.status(500).send({ status: 500 });
      }
    }
  }
};

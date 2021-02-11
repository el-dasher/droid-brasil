import Link from 'next/link';

import { FIRESTORE } from '../utils/firebase';

import { OsuDroidUser } from '../utils/interfaces';

import PlayerCard from '../components/rank/PlayerCard';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider';

export async function getStaticProps() {
  const top_players_doc = await FIRESTORE.collection('OSU!DROID')
    .doc('TOP_PLAYERS')
    .get();

  const top_players_data = top_players_doc.data();

  console.log(top_players_data);

  if (top_players_data) {
    const rankData: Array<OsuDroidUser> = top_players_data.user;
    return {
      props: {
        rankData
      },
      revalidate: 3600
    };
  }
}

interface props {
  rankData: Array<OsuDroidUser>;
}

export default function RankPage({ rankData }: props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <List>
        {rankData.map((user, index) => {
          const startRaised = index === 0 ? true : false;
          return (
            <ListItem
              key={user.uid}
              className="generic-list"
              style={{
                backgroundColor: 'rgba(255, 255, 255, .0)'
              }}
            >
              <Link href={`/profile?uid=${user.uid}`}>
                <div className="centered">
                  <span style={{ width: '90vw' }}>
                    <PlayerCard user={user} startRaised={startRaised} />
                  </span>
                </div>
              </Link>
              <Divider />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

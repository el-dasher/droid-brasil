import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';

import { OsuDroidUser } from '../utils/interfaces';

import PlayerCard from '../components/rank/PlayerCard';
import LoadingThing from '../components/LoadingThing';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

export default function RankPage() {
  const [rankData, setRankData] = useState<Array<OsuDroidUser> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRank = async () => {
      const res = await axios.get('/api/rank');
      const top_players_data = res.data.data.user;
      setRankData(top_players_data);
    };
    fetchRank();
  }, []);

  if (!rankData) {
    return <LoadingThing />;
  } else {
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
                  width: '65vw',
                  backgroundColor: 'rgba(255, 255, 255, .0)'
                }}
              >
                <div
                  onClick={() => router.push(`/profile?uid=${user.uid}`)}
                  className="centered"
                >
                  <span style={{ width: '90%' }}>
                    <PlayerCard user={user} startRaised={startRaised} />
                  </span>
                </div>
                <Divider />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

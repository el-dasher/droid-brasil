import { useEffect, useState, Fragment } from 'react';

import axios from 'axios';

import { OsuDroidUser } from '../utils/interfaces';

import PlayerCard from '../components/rank/PlayerCard';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

export default function RankPage() {
  const [rankData, setRankData] = useState<Array<OsuDroidUser> | null>(null);

  useEffect(() => {
    const fetchRank = async () => {
      const res = await axios.get('/api/rank/get');
      const top_players_data = res.data.data.user;
      setRankData(top_players_data);
    };
    fetchRank();
  }, []);

  if (!rankData) {
    return (
      <div className="element-loading">
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <List>
          {rankData.map((user, index) => {
            const startRaised = index === 0 ? true : false;
            return (
              <ListItem
                key={user.username}
                style={{ padding: '10px', width: '75vw' }}
              >
                <PlayerCard user={user} startRaised={startRaised} />
                <Divider />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

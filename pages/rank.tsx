import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardMedia, CardHeader, Typography } from '@material-ui/core';

interface play {
  accuracy: Number;
  combo: Number;
  hash: string;
  miss: Number;
  mods: string;
  pp: Number;
  title: string;
}

interface User {
  aim: Number;
  overall_acc: Number;
  pp_data: Array<play>;
  rank_score: string;
  username: string;
  reading: Number;
  speed: Number;
  total_dpp: Number;
  avatar: string;
}

export default function Rank() {
  const [rankData, setRankData] = useState<Array<User> | null>(null);

  useEffect(() => {
    const fetchRank = async () => {
      const res = await axios.get('/api/rank/get');
      const top_players_data = res.data.data.user;
      setRankData(top_players_data);
    };
    fetchRank();
  }, []);

  return (
    <Fragment>
      {!rankData ? (
        <div className="element-loading">
          <CircularProgress />
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <List subheader={<ListSubheader>Rank</ListSubheader>}>
            {rankData.map((user) => {
              return (
                <ListItem
                  key={user.username}
                  style={{ padding: '10px', width: '75vw' }}
                >
                  <Card style={{ alignSelf: 'center' }}>
                    <CardHeader
                      avatar={<Avatar src={user.avatar} />}
                      title={user.username}
                      subheader={`${user.total_dpp.toFixed(2)}dpp`}
                    />
                    <CardContent style={{ paddingLeft: '50px' }}>
                      <Typography variant="subtitle1">
                        <p>
                          Rank: #{user.rank_score} <br />
                          Acc: {user.overall_acc}% <br />
                          Aim: {user.aim.toFixed(2)} <br />
                          Speed: {user.speed.toFixed(2)}
                        </p>
                      </Typography>
                    </CardContent>
                  </Card>
                  <Divider />
                </ListItem>
              );
            })}
          </List>
          ;
        </div>
      )}
    </Fragment>
  );
}

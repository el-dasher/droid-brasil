import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { OsuDroidUser } from '../utils/interfaces';

import LoadingThing from '../components/LoadingThing';

import axios from 'axios';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

function UserPage() {
  const router = useRouter();
  const { uid } = router.query;

  const [user, setUser] = useState<OsuDroidUser | null>(null);

  useEffect(() => {
    if (uid) {
      const fetchUser = async () => {
        const res = await axios.get('/api/user', { params: { uid } });
        setUser(res.data);
      };
      fetchUser();
    }
  }, [uid]);

  if (!uid || !user) {
    return <LoadingThing />;
  } else if (user) {
    if (!user.exists) {
      return (
        <div className="centered">
          <div
            className="centered"
            style={{
              width: '75vw',
              border: 'solid',
              borderWidth: '5px',
              borderRadius: '20px',
              backgroundColor: 'white'
            }}
          >
            <Typography variant="h1">Usuário não encontrado</Typography>
          </div>
        </div>
      );
    } else {
      return (
        <Container
          style={{
            border: 'solid',
            borderWidth: '5px',
            borderRadius: '10px',
            width: '350px',
            backgroundColor: 'rgba(255, 255, 255, .875)'
          }}
        >
          <div>
            <div className="centered" style={{ padding: '25px' }}>
              <div
                style={{
                  border: 'solid',
                  borderRadius: '50%',
                  borderWidth: '5px'
                }}
              >
                <Avatar
                  src={user.avatar}
                  style={{
                    width: '150px',
                    height: 'auto',
                    justifySelf: 'center'
                  }}
                />
              </div>
            </div>
            <div>
              <span className="centered">
                <Typography variant="h3" noWrap>
                  {user.username}
                </Typography>
              </span>
              <span className="centered">
                <Typography variant="h4" noWrap>
                  {user.country}
                </Typography>
              </span>
              <span className="centered" style={{ padding: '25px' }}>
                <Typography variant="h5" noWrap>
                  <span className="centered">
                    Rank: #{user.rank_score.toLocaleString()}
                  </span>
                  <span className="centered">
                    Score: {user.total_score.toLocaleString()}
                  </span>
                  <span className="centered">
                    Accuracy: {user.overall_acc.toLocaleString()}%
                  </span>
                  <span className="centered">PlayCount: {user.play_count}</span>
                </Typography>
              </span>
            </div>
          </div>
        </Container>
      );
    }
  }
}

export default UserPage;

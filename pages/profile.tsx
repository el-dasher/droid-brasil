import { OsuDroidUser, OsuDroidPlay } from '../utils/interfaces';

import axios from 'axios';
import cheerio from 'cheerio';

import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

function minifyModString(mods: String) {
  let minifiedModString = mods
    .trim()
    .replace(' ', '')
    .replace(/,/g, '')
    .replace('DoubleTime', 'DT')
    .replace('Hidden', 'HD')
    .replace('HardRock', 'HR')
    .replace('Hidden', 'HD')
    .replace('HardRock', 'HR')
    .replace('Precise', 'PR')
    .replace('NoFail', 'NF')
    .replace('Easy', 'EZ')
    .replace('NightCore', 'NC')
    .replace('Precise', 'PR')
    .replace('None', 'NM')
    .replace(',', '');

  if (!minifiedModString) {
    minifiedModString = 'NM';
  }

  return minifiedModString;
}

interface ServerProps {
  query: {
    uid: number;
  };
}

export async function getServerSideProps({ query }: ServerProps) {
  const { uid } = query;
  let playerRaw = null;
  const endpoint = 'http://ops.dgsrz.com/profile.php';

  const odRes = await axios.get(`${endpoint}?uid=${uid}`);
  playerRaw = odRes.data;

  const $ = cheerio.load(playerRaw);
  const username = $('div.h3.m-t-xs.m-b-xs').text();
  const avatar_raw = $('div.text-center.m-b.m-t').find('img').attr('src');
  const avatar = avatar_raw ? avatar_raw : '';
  const country = $('small.text-muted').first().text();
  const rank_score = $('span.m-b-xs.h4.block').first().text();
  const technicalAnalysis = $('span.pull-right');
  const total_score = parseInt(
    technicalAnalysis.eq(-5).text().replace(/,/g, '')
  );
  const overall_acc = parseFloat(technicalAnalysis.eq(-4).text());
  const play_count = parseInt(technicalAnalysis.eq(-3).text());
  const exists = username.length !== 0 ? true : false;
  const recent_plays = $('li.list-group-item')
    .toArray()
    .map((element) => {
      if (element) {
        const cheerioElement = $(element);
        const title = cheerioElement.find('strong.block').text();
        const statistics = cheerioElement.find('span.hidden').text();
        const statisticsArray = statistics.split(',');
        let misses = 0;
        let hash = null;
        const missRaw = statisticsArray[0];
        const hashRaw = statisticsArray[1];
        if (missRaw && hashRaw) {
          misses = parseInt(missRaw.replace('{"miss":', ''));
          hash = hashRaw.replace('"hash":', '').replace('}', '');
        }
        const smallData = cheerioElement.find('small').text();
        if (smallData) {
          const smallDataArray = smallData.split('/');
          const timestamp = smallDataArray[0]; // Not a date time so it1s json serializable
          const score = parseInt(smallDataArray[1].replace(/,/g, ''));
          const mods = minifyModString(smallDataArray[2]);
          const combo = parseInt(smallDataArray[3].replace('x', ''));
          const accuracy = parseFloat(smallDataArray[4].replace('%', ''));
          return {
            title,
            timestamp,
            score,
            mods,
            combo,
            accuracy,
            hash,
            misses
          };
        }
      } else {
        return null;
      }
    })
    .filter((play) => {
      if (play) {
        const { title, timestamp, score, mods, combo, accuracy } = play;
        return title && timestamp && score && mods && combo && accuracy;
      } else {
        return null;
      }
    });

  if (recent_plays) {
    const user: OsuDroidUser = {
      uid,
      username,
      avatar,
      country,
      rank_score,
      overall_acc,
      total_score,
      play_count,
      exists,
      // @ts-ignore
      recent_plays
    };
    return {
      props: { user }
    };
  }
}

interface Props {
  user: OsuDroidUser;
}

function UserPage({ user }: Props) {
  if (user) {
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
        <div className="centered" style={{ paddingBottom: '50px' }}>
          <div style={{ width: '90vw' }}>
            <Container className="default-container">
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
                    <Typography variant="h5">
                      <span className="centered">
                        Rank: #{user.rank_score.toLocaleString()}
                      </span>
                      <span className="centered">
                        Score: {user.total_score.toLocaleString()}
                      </span>
                      <span className="centered">
                        Accuracy: {user.overall_acc.toLocaleString()}%
                      </span>
                      <span className="centered">
                        PlayCount: {user.play_count}
                      </span>
                    </Typography>
                  </span>
                </div>
              </div>
            </Container>
            <br></br>
            <Container className="default-container">
              <div className="centered">
                <Typography variant="h4">Plays recentes</Typography>
              </div>
              <Divider />
              {user.recent_plays!.map((play: OsuDroidPlay) => {
                const { title, timestamp, score, mods, accuracy, combo } = play;
                return (
                  <div key={title}>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="subtitle1">
                      {timestamp} / {score.toLocaleString()} / {mods} / {combo}x
                      / {accuracy.toLocaleString()}%
                    </Typography>
                    <Divider />
                  </div>
                );
              })}
            </Container>
          </div>
        </div>
      );
    }
  }
}

export default UserPage;

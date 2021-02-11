import { useState, Fragment } from 'react';
import { OsuDroidUser } from '../../utils/interfaces';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

interface Props {
  user: OsuDroidUser;
  startRaised?: boolean;
}

function PlayerCard({ user, startRaised }: Props) {
  const [raised, setRaised] = useState(startRaised);

  const toggleRaised = () => setRaised(startRaised ? raised : !raised);

  return (
    <Fragment>
      <Card
        className="hoverable"
        style={{
          justifySelf: 'center',
          alignSelf: 'center',
          backgroundColor: 'rgba(255, 255, 255, .95)',
          border: 'solid'
        }}
        onMouseOver={toggleRaised}
        onMouseOut={toggleRaised}
        raised={raised}
      >
        <CardHeader
          avatar={<Avatar src={user.avatar} />}
          title={user.username}
          subheader={`${user.total_dpp!.toFixed(2)}dpp`}
        />
        <CardContent style={{ paddingLeft: '50px' }}>
          <Typography variant="h6">
            Rank: #{user.rank_score.toLocaleString()}
            <br />
            Acc: {user.overall_acc.toLocaleString()}%
            <br />
            Aim: {user.aim!.toFixed(2).toLocaleString()}
            <br />
            Speed: {user.speed!.toFixed(2).toLocaleString()}
            <br />
            Reading: {user.reading!.toFixed(2).toLocaleString()}
            <br />
            Score: {user.total_score.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
      <Divider />
    </Fragment>
  );
}

PlayerCard.defaultProps = {
  startRaised: false
};

export default PlayerCard;

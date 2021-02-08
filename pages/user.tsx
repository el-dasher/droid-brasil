import { useRouter } from 'next/router';
import { useEffect, Fragment } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

function UserPage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setTimeout(() => {
      if (!id) {
        console.error("TIMEOUT, id wasn't provided");
        router.push('/');
      }
    }, 2500);
  });

  if (!id) {
    return (
      <div className="element-loading">
        <CircularProgress />
      </div>
    );
  } else {
    return <div>{id}</div>;
  }
}

export default UserPage;

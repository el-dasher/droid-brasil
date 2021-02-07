import NavBar from '../components/NavBar';

import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/globals.css';

interface props {
  Component: Function;
  pageProps: Object;
}

export default function App({ Component, pageProps }: props) {
  return (
    <CssBaseline>
      <NavBar />
      <div id="main">
        <Component {...pageProps} />
      </div>
    </CssBaseline>
  );
}

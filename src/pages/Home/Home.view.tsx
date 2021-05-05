import { FC } from 'react';
import { Link, RouteComponentProps } from '@reach/router';

interface Props extends RouteComponentProps {}

const Home: FC<Props> = () => {
  return (
    <>
      <h1>Audio experiments</h1>

      <ul>
        <li>
          <Link to="/live-captions">Live captions</Link>
        </li>
        <li>
          <Link to="/captions-with-mood">Captions with mood</Link>
        </li>
        <li>
          <Link to="/captions-with-mood-chart">Captions with mood chart</Link>
        </li>
      </ul>
    </>
  );
};

export default Home;

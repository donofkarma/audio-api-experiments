import { FC } from 'react';
import { Router } from '@reach/router';

import CaptionsWithMood from 'pages/CaptionsWithMood';
import CaptionsWithMoodChart from 'pages/CaptionsWithMoodChart';
import Home from 'pages/Home';
import LiveCaptions from 'pages/LiveCaptions';

const App: FC = () => {
  return (
    <Router>
      <Home path="/" />
      <LiveCaptions path="live-captions" />
      <CaptionsWithMood path="captions-with-mood" />
      <CaptionsWithMoodChart path="captions-with-mood-chart" />
    </Router>
  );
};

export default App;

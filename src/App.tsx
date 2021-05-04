import { FC } from 'react';
import { Router } from '@reach/router';

import CaptionsWithEmotion from 'pages/CaptionsWithEmotion';
import CaptionsWithMood from 'pages/CaptionsWithMood';
import Home from 'pages/Home';
import LiveCaptions from 'pages/LiveCaptions';

const App: FC = () => {
  return (
    <Router>
      <Home path="/" />
      <LiveCaptions path="live-captions" />
      <CaptionsWithMood path="captions-with-mood" />
      <CaptionsWithEmotion path="captions-with-emotion" />
    </Router>
  );
};

export default App;

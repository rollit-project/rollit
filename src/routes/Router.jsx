import { Route, Routes } from 'react-router-dom';

import Intro from '@/pages/Intro';

import Simulation from '../pages/Simulation';
import TrackEditor from '../pages/TrackEditor';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/track-editor" element={<TrackEditor />} />
      <Route path="/simulation" element={<Simulation />} />
    </Routes>
  );
};

export default Router;

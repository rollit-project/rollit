import { Route, Routes } from 'react-router-dom';

import Editor from '@/pages/Editor';
import Intro from '@/pages/Intro';
import NotFound from '@/pages/NotFound';
import Simulation from '@/pages/Simulation';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/simulation" element={<Simulation />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;

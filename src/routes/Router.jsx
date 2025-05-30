import { Route, Routes } from 'react-router-dom';

import EditorScene from '@/pages/EditorScene';
import Intro from '@/pages/Intro';
import NotFound from '@/pages/NotFound';
import Simulation from '@/pages/Simulation';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/editor-scene" element={<EditorScene />} />
      <Route path="/simulation" element={<Simulation />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;

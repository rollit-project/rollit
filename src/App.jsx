import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import GlobalAudioPlayer from '@/components/sound/GlobalAudioPlayer';
import Router from '@/routes/Router';

const App = () => {
  return (
    <BrowserRouter>
      <Router />
      <GlobalAudioPlayer />
      <Toaster position="top-center" />
    </BrowserRouter>
  );
};

export default App;

import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import Router from '@/routes/Router';

const App = () => {
  return (
    <BrowserRouter>
      <Router />
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;

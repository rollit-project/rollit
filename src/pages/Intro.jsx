import { Link } from 'react-router-dom';

import Button from '@/components/commons/Button';

const Intro = () => {
  return (
    <main className="h-screen bg-[url(assets/images/intro.png)] bg-cover bg-center">
      <Link to="/simulation" className="fixed top-2/3 right-1/2 translate-x-1/2">
        <Button buttonText="START" textSize="36px" padding="20px" />
      </Link>
    </main>
  );
};

export default Intro;

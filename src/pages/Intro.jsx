import { Link } from 'react-router-dom';

const Intro = () => {
  return (
    <main className="h-screen bg-[url(assets/images/intro.png)] bg-cover bg-center">
      <Link
        to="/track-editor"
        className="btn-primary fixed top-2/3 right-1/2 translate-x-1/2 p-[20px] text-[36px]"
      >
        START
      </Link>
    </main>
  );
};

export default Intro;

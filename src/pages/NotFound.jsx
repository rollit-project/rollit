import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-blue-100 text-center">
      <h1 className="text-[120px] font-black text-yellow-400 drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
        404
      </h1>
      <p className="mb-4 text-3xl font-bold text-gray-800">Page not found</p>
      <p className="mb-10 text-lg text-gray-600">
        I got lost on the way to <span className="font-bold text-black">ROLLIT</span>
      </p>
      <Link to="/" className="btn-primary p-[15px] text-[20px]">
        Back to Home
      </Link>
      <img
        src="/images/ui/roller-coaster.png"
        alt="rollercoaster"
        className="mt-10 h-auto w-[300px]"
      />
    </main>
  );
};

export default NotFound;

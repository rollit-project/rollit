const ResultModal = () => {
  return (
    <section className="bg-opacity-50 fixed top-1/2 left-1/2 flex h-[403px] w-[574px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-md bg-amber-400 p-4">
      <header className="flex h-[29px] w-[90px] items-center justify-center">
        <h1 className="text-lg font-bold text-black">RESULT</h1>
      </header>
      <div className="mt-[30px] flex h-[187px] w-[391px] flex-col items-center justify-center rounded-md bg-red-50">
        <ul className="w-[250px] space-y-3 text-lg text-black">
          <li className="flex h-[24px] justify-between px-0">
            <span>최고 속도:</span> <span>82.2km/h</span>
          </li>
          <li className="flex h-[24px] justify-between">
            <span>평균 마찰속도:</span> <span>82.2km/h</span>
          </li>
          <li className="flex h-[24px] justify-between">
            <span>최대 중력가속도:</span> <span>6.3 m/s²</span>
          </li>
          <li className="flex h-[24px] justify-between">
            <span>총 소요시간:</span> <span>38.2초</span>
          </li>
        </ul>
      </div>
      <footer className="mt-[30px]">
        <button
          type="button"
          className="h-[41px] w-[126px] rounded-md bg-black font-bold text-white"
        >
          Restart
        </button>
      </footer>
    </section>
  );
};

export default ResultModal;

import ModalLayout from '@/components/ui/modal/ModalLayout';

const resultData = [
  { label: '최고 속도', value: '82.2km/h' },
  { label: '평균 마찰속도', value: '82.2km/h' },
  { label: '최대 중력가속도', value: '6.3 m/s²' },
  { label: '총 소요시간', value: '38.2초' },
];

const ResultModal = () => {
  return (
    <ModalLayout>
      <h2 className="text-lg font-bold text-black">RESULT</h2>
      <div className="mt-6 flex h-[187px] flex-col items-center justify-center rounded-md bg-yellow-400">
        <ul className="w-[250px] space-y-3 text-lg text-black">
          {resultData.map(({ label, value }) => (
            <li key={label} className="flex h-[24px] justify-between">
              <span>{label}:</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
      <footer className="mt-6">
        <button
          type="button"
          className="h-[41px] w-[126px] rounded-md bg-black font-bold text-white"
        >
          Restart
        </button>
      </footer>
    </ModalLayout>
  );
};

export default ResultModal;

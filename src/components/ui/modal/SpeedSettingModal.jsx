import PropTypes from 'prop-types';
import { useState } from 'react';

import ModalLayout from '@/components/ui/modal/ModalLayout';

const SpeedSettingModal = ({ onCancel, onStart }) => {
  const [speed, setSpeed] = useState(1);

  return (
    <ModalLayout>
      <h2 className="mb-4 text-xl font-bold">전체 속도 설정</h2>
      <p className="mb-4 text-gray-600">속도 배속을 선택해주세요.</p>
      <div className="mb-6">
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full cursor-pointer appearance-none rounded-lg border-1 border-amber-300 bg-white accent-yellow-300 dark:bg-gray-700"
        />
        <p className="mt-2 text-center text-lg font-semibold">현재 속도: {speed.toFixed(1)}x</p>
      </div>
      <footer className="flex justify-center gap-5">
        <button
          type="button"
          className="w-full rounded-lg border border-yellow-400 px-4 py-2 hover:bg-yellow-300"
          onClick={onCancel}
        >
          취소
        </button>
        <button
          type="button"
          className="w-full rounded-lg border border-yellow-400 px-4 py-2 hover:bg-yellow-300"
          onClick={onStart}
        >
          시작
        </button>
      </footer>
    </ModalLayout>
  );
};

SpeedSettingModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
};

export default SpeedSettingModal;

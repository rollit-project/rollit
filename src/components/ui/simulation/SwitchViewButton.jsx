import { FaEye, FaUser } from 'react-icons/fa';

import { useSceneStore } from '@/store/useSceneStore';

const SwitchViewButton = () => {
  const viewMode = useSceneStore((state) => state.viewMode);
  const toggleViewMode = useSceneStore((state) => state.toggleViewMode);

  const icon = viewMode === 'firstPerson' ? <FaUser /> : <FaEye />;
  const label = viewMode === 'firstPerson' ? '3인칭 보기' : '1인칭 보기';

  return (
    <button
      type="button"
      onClick={toggleViewMode}
      className="absolute top-5 right-5 flex items-center gap-2 rounded-full bg-yellow-300 px-4 py-3 text-sm font-semibold text-black shadow transition hover:scale-105 active:scale-95"
      title="시점 전환"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default SwitchViewButton;

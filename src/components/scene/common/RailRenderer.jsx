import RailModel from '@/components/scene/common/RailModel';
import { useRailStore } from '@/store/useRailStore';

const RailRenderer = () => {
  const placedRails = useRailStore((state) => state.placedRails);

  return (
    <>
      {placedRails.map((rail) => (
        <RailModel
          key={rail.id}
          path={rail.modelPath}
          position={rail.position}
          rotation={rail.rotation}
        />
      ))}
    </>
  );
};

export default RailRenderer;

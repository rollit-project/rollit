import RailModel from '@/components/scene/common/RailModel';
import { useSceneStore } from '@/store/useSceneStore';

const RailRenderer = () => {
  const placedRails = useSceneStore((state) => state.placedRails);

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

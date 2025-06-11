import { Line, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import CartModel from '@/components/scene/CartModel';
import DirectionalLight from '@/components/scene/DirectionalLight';
import Ground from '@/components/scene/Ground';
import ItemModel from '@/components/scene/ItemModel';
import RailRenderer from '@/components/scene/RailRenderer';
import { useSceneStore } from '@/store/useSceneStore';

const SimulationCanvas = () => {
  const { scene: coaster } = useGLTF('/objects/coaster.glb');
  const placedItems = useSceneStore((state) => state.placedItems);
  const coasterPath = useSceneStore((state) => state.coasterPath);

  return (
    <Canvas shadows camera={{ position: [10, 5, 10], fov: 75 }}>
      <color attach="background" args={['#b0eaff']} />
      <ambientLight intensity={0.4} />
      <DirectionalLight />
      {placedItems.map((item) => (
        <ItemModel
          key={item.id}
          selectedItem={item.name}
          position={item.position}
          rotation={[0, item.rotationY, 0]}
        />
      ))}
      <RailRenderer />
      <primitive object={coaster.clone()} position={[0, 0, 0]} />
      <CartModel />
      <Ground />
      {coasterPath && <Line points={coasterPath.getPoints(100)} color="yellow" lineWidth={2} />}
    </Canvas>
  );
};

export default SimulationCanvas;

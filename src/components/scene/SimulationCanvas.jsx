import { Line, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import CartModel from '@/components/scene/CartModel';
import DirectionalLight from '@/components/scene/DirectionalLight';
import Ground from '@/components/scene/Ground';
import ItemRenderer from '@/components/scene/ItemRenderer';
import RailRenderer from '@/components/scene/RailRenderer';

const SimulationCanvas = () => {
  const { scene: coaster } = useGLTF('/objects/coaster.glb');

  return (
    <Canvas shadows camera={{ position: [10, 5, 10], fov: 75 }}>
      <color attach="background" args={['#b0eaff']} />
      <ambientLight intensity={0.4} />
      <DirectionalLight />
      <ItemRenderer />
      <RailRenderer />
      <primitive object={coaster.clone()} position={[0, 0, 0]} />
      <CartModel />
      <Ground />
    </Canvas>
  );
};

export default SimulationCanvas;

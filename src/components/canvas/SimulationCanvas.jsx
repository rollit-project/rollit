import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import DirectionalLight from '@/components/scene/common/DirectionalLight';
import Ground from '@/components/scene/common/Ground';
import ItemRenderer from '@/components/scene/common/ItemRenderer';
import RailRenderer from '@/components/scene/common/RailRenderer';
import CartFollower from '@/components/scene/simulation/CartFollower';

const SimulationCanvas = () => {
  const gltf = useGLTF('/objects/coasterEntrance.glb');

  if (!gltf?.scene) {
    return null;
  }

  const { scene: coasterEntrance } = gltf;

  return (
    <Canvas shadows camera={{ position: [10, 10, 10], fov: 75 }}>
      <color attach="background" args={['#b0eaff']} />
      <ambientLight intensity={0.4} />
      <DirectionalLight />
      <ItemRenderer />
      <RailRenderer />
      <primitive object={coasterEntrance.clone()} position={[0, 0, 0]} />
      <CartFollower />
      <Ground />
    </Canvas>
  );
};

export default SimulationCanvas;

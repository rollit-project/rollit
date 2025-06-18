import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

import { useAudio } from '@/hooks/useAudio';
import { useSyncCartAndCamera } from '@/hooks/useSyncCartAndCamera';
import { useSimulationStore } from '@/store/useSimulationStore';
import { getCartSpeed } from '@/utils/getCartSpeed';

const CartFollower = () => {
  const cartRef = useRef();

  const simulationProgress = useSimulationStore((state) => state.simulationProgress);
  const setSimulationProgress = useSimulationStore((state) => state.setSimulationProgress);
  const coasterPath = useSimulationStore((state) => state.coasterPath);
  const simulationSpeed = useSimulationStore((state) => state.simulationSpeed);

  const { scene: cart } = useGLTF('/objects/coaster/cart.glb');
  const syncCartAndCamera = useSyncCartAndCamera(cartRef);

  const { stopSfx } = useAudio();

  useEffect(() => {
    setSimulationProgress(0);
  }, []);

  useFrame((_, delta) => {
    const shouldSkipFrame = !coasterPath || !cartRef.current || simulationProgress >= 1;

    if (shouldSkipFrame) {
      return;
    }

    const direction = coasterPath.getTangentAt(simulationProgress);
    const cartSpeed = getCartSpeed(direction);
    const nextProgress = Math.min(simulationProgress + delta * cartSpeed * simulationSpeed, 1);

    setSimulationProgress(nextProgress);
    syncCartAndCamera(nextProgress, direction);

    if (nextProgress >= 1) {
      stopSfx();
    }
  });

  return <primitive ref={cartRef} object={cart} scale={[1, 1, 0.8]} />;
};

export default CartFollower;

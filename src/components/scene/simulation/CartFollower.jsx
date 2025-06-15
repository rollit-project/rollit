import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

import { useSceneStore } from '@/store/useSceneStore';
import { getRotationFromDirection } from '@/utils/getRotationFromDirection';

const CartFollower = () => {
  const cartRef = useRef();
  const [progress, setProgress] = useState(0);
  const coasterPath = useSceneStore((state) => state.coasterPath);

  const { scene: cart } = useGLTF('/objects/cart.glb');

  const BASE_SPEED = 0.3;
  const SPEED_REDUCTION = 0.3;
  const MIN_SPEED = 0.05;

  useFrame((_, delta) => {
    if (!coasterPath || !cartRef.current) {
      return;
    }

    const direction = coasterPath.getTangentAt(progress);

    let speed = BASE_SPEED;

    if (direction.y > 0) {
      speed = BASE_SPEED - direction.y * SPEED_REDUCTION;
      speed = Math.max(speed, MIN_SPEED);
    }

    const newProgress = Math.min(progress + delta * speed, 1);

    setProgress(newProgress);

    const cartHeightOffset = 2;
    const currentPosition = coasterPath.getPointAt(newProgress);

    const { rotationQuaternion, adjustedUp } = getRotationFromDirection(direction);

    const raisedPosition = currentPosition.add(adjustedUp.multiplyScalar(cartHeightOffset));

    cartRef.current.position.copy(raisedPosition);
    cartRef.current.quaternion.copy(rotationQuaternion);
  });

  return <primitive ref={cartRef} object={cart} scale={[1, 1, 0.8]} />;
};

export default CartFollower;

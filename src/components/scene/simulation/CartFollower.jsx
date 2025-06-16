import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';

import { useSceneStore } from '@/store/useSceneStore';
import { getRotationFromDirection } from '@/utils/getRotationFromDirection';

const CartFollower = () => {
  const cartRef = useRef();
  const [progress, setProgress] = useState(0);
  const coasterPath = useSceneStore((state) => state.coasterPath);
  const viewMode = useSceneStore((state) => state.viewMode);

  const { scene: cart } = useGLTF('/objects/cart.glb');
  const { camera } = useThree();

  const updateCartAndCamera = (newProgress) => {
    if (!coasterPath || !cartRef.current) {
      return;
    }

    const cartHeightOffset = 2;
    const currentPosition = coasterPath.getPointAt(newProgress);
    const direction = coasterPath.getTangentAt(newProgress);

    const { rotationQuaternion, adjustedUp } = getRotationFromDirection(direction);

    const raisedPosition = currentPosition.add(adjustedUp.multiplyScalar(cartHeightOffset));

    cartRef.current.position.copy(raisedPosition);
    cartRef.current.quaternion.copy(rotationQuaternion);

    if (viewMode === 'firstPerson') {
      const upFromCart = adjustedUp.clone().multiplyScalar(2.0);
      const inFrontOfCart = direction.clone().multiplyScalar(1.0);
      const cameraPosition = currentPosition.clone().add(upFromCart).add(inFrontOfCart);
      const lookAtPoint = currentPosition.clone().add(direction.clone().multiplyScalar(5));

      camera.position.copy(cameraPosition);
      camera.lookAt(lookAtPoint);
    } else if (viewMode === 'thirdPerson') {
      const behindCart = direction.clone().multiplyScalar(-10);

      behindCart.y += 4;
      const cameraPosition = raisedPosition.clone().add(behindCart);

      camera.position.lerp(cameraPosition, 0.1);
      camera.lookAt(raisedPosition);
    }
  };

  useFrame((_, delta) => {
    if (progress >= 1) {
      return;
    }

    const speed = 0.2;
    const nextProgress = Math.min(progress + delta * speed, 1);

    setProgress(nextProgress);
    updateCartAndCamera(nextProgress);
  });

  return <primitive ref={cartRef} object={cart} scale={[1, 1, 0.8]} />;
};

export default CartFollower;

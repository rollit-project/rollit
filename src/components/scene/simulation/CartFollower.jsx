import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

import {
  BASE_CART_SPEED,
  MIN_CART_SPEED,
  SPEED_ACCELERATION,
  SPEED_REDUCTION,
} from '@/constants/cartSpeed';
import { SIMULATION_CAMERA } from '@/constants/simulationCamera';
import { useSceneStore } from '@/store/useSceneStore';
import { getRotationFromDirection } from '@/utils/getRotationFromDirection';

const CartFollower = () => {
  const cartRef = useRef();

  const simulationProgress = useSceneStore((state) => state.simulationProgress);
  const setSimulationProgress = useSceneStore((state) => state.setSimulationProgress);
  const coasterPath = useSceneStore((state) => state.coasterPath);
  const viewMode = useSceneStore((state) => state.viewMode);
  const simulationSpeed = useSceneStore((state) => state.simulationSpeed);

  const { scene: cart } = useGLTF('/objects/cart.glb');
  const { camera } = useThree();

  const { FIRST_PERSON, THIRD_PERSON, LERP } = SIMULATION_CAMERA;

  const updateCartAndCamera = (newProgress, direction) => {
    const cartHeightOffset = 2;
    const currentPosition = coasterPath.getPointAt(newProgress);

    const { rotationQuaternion, adjustedUp } = getRotationFromDirection(direction);

    const raisedPosition = currentPosition.add(adjustedUp.multiplyScalar(cartHeightOffset));

    cartRef.current.position.copy(raisedPosition);
    cartRef.current.quaternion.copy(rotationQuaternion);

    if (viewMode === 'firstPerson') {
      const upFromCart = adjustedUp.clone().multiplyScalar(FIRST_PERSON.UP_OFFSET);
      const inFrontOfCart = direction.clone().multiplyScalar(FIRST_PERSON.FORWARD_OFFSET);
      const cameraPosition = currentPosition.clone().add(upFromCart).add(inFrontOfCart);
      const lookAtPoint = currentPosition
        .clone()
        .add(direction.clone().multiplyScalar(FIRST_PERSON.LOOK_AHEAD));

      camera.position.copy(cameraPosition);
      camera.lookAt(lookAtPoint);
    } else if (viewMode === 'thirdPerson') {
      const behindCart = direction.clone().multiplyScalar(THIRD_PERSON.BACKWARD_OFFSET);

      behindCart.y += THIRD_PERSON.HEIGHT_OFFSET;
      const cameraPosition = raisedPosition.clone().add(behindCart);

      camera.position.lerp(cameraPosition, LERP);
      camera.lookAt(raisedPosition);
    }
  };

  const getCartSpeed = (direction) => {
    if (direction.y > 0) {
      const reducedSpeed = BASE_CART_SPEED - direction.y * SPEED_REDUCTION;

      return Math.max(reducedSpeed, MIN_CART_SPEED);
    }
    if (direction.y < 0) {
      return BASE_CART_SPEED + Math.abs(direction.y) * SPEED_ACCELERATION;
    }

    return BASE_CART_SPEED;
  };

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
    updateCartAndCamera(nextProgress, direction);
  });

  return <primitive ref={cartRef} object={cart} scale={[1, 1, 0.8]} />;
};

export default CartFollower;

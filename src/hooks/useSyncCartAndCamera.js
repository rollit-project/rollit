import { useThree } from '@react-three/fiber';

import { SIMULATION_CAMERA } from '@/constants/camera/simulationCamera';
import { useSimulationStore } from '@/store/useSimulationStore';
import { getRotationFromDirection } from '@/utils/rail/getRotationFromDirection';

export const useSyncCartAndCamera = (cartRef) => {
  const { camera } = useThree();
  const coasterPath = useSimulationStore((state) => state.coasterPath);
  const viewMode = useSimulationStore((state) => state.viewMode);
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
    } else {
      const behindCart = direction.clone().multiplyScalar(THIRD_PERSON.BACKWARD_OFFSET);

      behindCart.y += THIRD_PERSON.HEIGHT_OFFSET;
      const cameraPosition = raisedPosition.clone().add(behindCart);

      camera.position.lerp(cameraPosition, LERP);
      camera.lookAt(raisedPosition);
    }
  };

  return updateCartAndCamera;
};

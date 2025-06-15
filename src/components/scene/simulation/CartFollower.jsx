import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

import { SFX_PATHS, SOUND_CONFIG } from '@/constants/sound';
import { useAudioStore } from '@/store/useAudioStore';
import { useSceneStore } from '@/store/useSceneStore';
import { getRotationFromDirection } from '@/utils/getRotationFromDirection';

const CartFollower = () => {
  const cartRef = useRef();
  const [progress, setProgress] = useState(0);
  const hasStartedSoundRef = useRef(false);
  const hasStoppedSoundRef = useRef(false);

  const coasterPath = useSceneStore((state) => state.coasterPath);
  const placedRails = useSceneStore((state) => state.placedRails);

  const { scene: cart } = useGLTF('/objects/cart.glb');

  const playSfx = useAudioStore((state) => state.playSfx);
  const stopSfx = useAudioStore((state) => state.stopSfx);

  useFrame((_, delta) => {
    const isCartReady = coasterPath && cartRef.current && placedRails.length > 0;

    if (!isCartReady) {
      return;
    }

    const speed = 0.2;
    const newProgress = Math.min(progress + delta * speed, 1);

    setProgress(newProgress);

    if (!hasStartedSoundRef.current && newProgress > 0 && newProgress < 1) {
      playSfx(SFX_PATHS.play, SOUND_CONFIG.BGM.DEFAULT_VOLUME, true);
      hasStartedSoundRef.current = true;
      hasStoppedSoundRef.current = false;
    }

    if (newProgress >= 1 && hasStartedSoundRef.current && !hasStoppedSoundRef.current) {
      stopSfx();
      hasStoppedSoundRef.current = true;
      hasStartedSoundRef.current = false;
    }

    const cartHeightOffset = 2;
    const currentPosition = coasterPath.getPointAt(newProgress);
    const direction = coasterPath.getTangentAt(newProgress);
    const { rotationQuaternion, adjustedUp } = getRotationFromDirection(direction);
    const raisedPosition = currentPosition.add(adjustedUp.multiplyScalar(cartHeightOffset));

    cartRef.current.position.copy(raisedPosition);
    cartRef.current.quaternion.copy(rotationQuaternion);
  });

  return <primitive ref={cartRef} object={cart} scale={[1, 1, 0.8]} />;
};

export default CartFollower;

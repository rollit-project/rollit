import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

import { useSceneStore } from '@/store/useSceneStore';

const CartFollower = () => {
  const cartRef = useRef();
  const [progress, setProgress] = useState(0);
  const coasterPath = useSceneStore((state) => state.coasterPath);

  const { scene: cart } = useGLTF('/objects/cart.glb');

  useFrame((_, delta) => {
    if (!coasterPath || !cartRef.current) {
      return;
    }

    const speed = 0.2;
    const newProgress = Math.min(progress + delta * speed, 1);

    setProgress(newProgress);

    const cartHeightOffset = 2;
    const currentPosition = coasterPath.getPointAt(newProgress);
    const direction = coasterPath.getTangentAt(newProgress);
    const up = new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3().crossVectors(up, direction).normalize();
    const adjustedUp = new THREE.Vector3().crossVectors(direction, right).normalize();

    const rotationMatrix = new THREE.Matrix4().makeBasis(right, adjustedUp, direction);
    const rotationQuaternion = new THREE.Quaternion().setFromRotationMatrix(rotationMatrix);

    const raisedPosition = currentPosition.add(adjustedUp.multiplyScalar(cartHeightOffset));

    cartRef.current.position.copy(raisedPosition);
    cartRef.current.quaternion.copy(rotationQuaternion);
  });

  return <primitive ref={cartRef} object={cart} scale={[1, 1, 0.8]} />;
};

export default CartFollower;

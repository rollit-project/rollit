import { useThree } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';

import ItemModel from '@/components/scene/common/ItemModel';
import { useItemStore } from '@/store/useItemStore';

const MouseFollower = () => {
  const { camera, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
  const [previewPosition, setPreviewPosition] = useState(new THREE.Vector3());
  const [rotationY, setRotationY] = useState(0);

  const selectedItem = useItemStore((state) => state.selectedItem);
  const setSelectedItem = useItemStore((state) => state.setSelectedItem);
  const placedItems = useItemStore((state) => state.placedItems);
  const setPlacedItems = useItemStore((state) => state.setPlacedItems);

  const computeIntersectPosition = useCallback(
    (event) => {
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.current.setFromCamera(new THREE.Vector2(normalizedX, normalizedY), camera);
      const intersect = new THREE.Vector3();

      raycaster.current.ray.intersectPlane(planeRef.current, intersect);

      return intersect;
    },
    [camera],
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'KeyQ') {
        setRotationY((prev) => prev - Math.PI / 6);
      } else if (event.code === 'KeyE') {
        setRotationY((prev) => prev + Math.PI / 6);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const intersect = computeIntersectPosition(event);

      if (intersect) {
        setPreviewPosition(intersect.clone());
      }
    };

    const handlePointerDown = (event) => {
      const intersect = computeIntersectPosition(event);

      if (intersect && selectedItem) {
        setPlacedItems([
          ...placedItems,
          { name: selectedItem, position: intersect.clone(), id: uuidv4(), rotationY },
        ]);
        setSelectedItem(null);
        setRotationY(0);
      }
    };

    const dom = gl.domElement;

    dom.addEventListener('pointermove', handlePointerMove);
    dom.addEventListener('pointerdown', handlePointerDown);

    return () => {
      dom.removeEventListener('pointermove', handlePointerMove);
      dom.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [gl, selectedItem, rotationY]);

  if (!selectedItem) {
    return null;
  }

  return (
    <ItemModel
      selectedItem={selectedItem}
      position={previewPosition}
      rotation={[0, rotationY, 0]}
    />
  );
};

export default MouseFollower;

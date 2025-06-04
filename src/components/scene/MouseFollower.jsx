import { useThree } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import PreviewModel from '@/components/scene/PreviewModel';

const MouseFollower = ({ selectedItem, handlePlaceItems, handleSelectItem }) => {
  const { camera, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
  const [previewPosition, setPreviewPosition] = useState(new THREE.Vector3());

  const computeIntersectPosition = useCallback(
    (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.current.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersect = new THREE.Vector3();

      raycaster.current.ray.intersectPlane(planeRef.current, intersect);

      return intersect;
    },
    [camera],
  );

  useEffect(() => {
    if (!gl?.domElement || !selectedItem) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      const intersect = computeIntersectPosition(event);

      if (intersect) {
        setPreviewPosition(intersect.clone());
      }
    };

    const handlePointerDown = (event) => {
      const intersect = computeIntersectPosition(event);

      if (intersect && selectedItem) {
        handlePlaceItems({
          name: selectedItem,
          position: intersect.clone(),
        });
        handleSelectItem(null);
      }
    };

    const dom = gl.domElement;

    dom.addEventListener('pointermove', handlePointerMove);
    dom.addEventListener('pointerdown', handlePointerDown);

    return () => {
      dom.removeEventListener('pointermove', handlePointerMove);
      dom.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [gl, selectedItem, handleSelectItem, handlePlaceItems, computeIntersectPosition]);

  if (!selectedItem) {
    return null;
  }

  return <PreviewModel selectedItem={selectedItem} position={previewPosition} />;
};

MouseFollower.propTypes = {
  selectedItem: PropTypes.string.isRequired,
  handlePlaceItems: PropTypes.func.isRequired,
  handleSelectItem: PropTypes.func.isRequired,
};

export default MouseFollower;

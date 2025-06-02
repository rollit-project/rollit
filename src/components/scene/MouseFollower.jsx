import { useThree } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import PreviewModel from '@/components/scene/PreviewModel';

const MouseFollower = ({ selectedItem }) => {
  const { camera, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const [previewPosition, setPreviewPosition] = useState(new THREE.Vector3(0, 0, 0));
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));

  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.current.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersect = new THREE.Vector3();

      raycaster.current.ray.intersectPlane(planeRef.current, intersect);

      setPreviewPosition(intersect);
    };

    gl.domElement.addEventListener('pointermove', handlePointerMove);

    return () => gl.domElement.removeEventListener('pointermove', handlePointerMove);
  }, [camera, gl]);

  if (!selectedItem) {
    return null;
  }

  return <PreviewModel selectedItem={selectedItem} position={previewPosition} />;
};

MouseFollower.propTypes = {
  selectedItem: PropTypes.string.isRequired,
};

export default MouseFollower;

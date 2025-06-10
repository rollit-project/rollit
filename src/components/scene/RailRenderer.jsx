import PropTypes from 'prop-types';
import { Vector3 } from 'three';

import RailModel from '@/components/scene/RailModel';

const RailRenderer = ({ placedRails }) => {
  return (
    <>
      {placedRails.map((rail) => (
        <RailModel
          key={rail.id}
          path={rail.modelPath}
          position={rail.position}
          rotation={rail.rotation}
        />
      ))}
    </>
  );
};

RailRenderer.propTypes = {
  placedRails: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      modelPath: PropTypes.string.isRequired,
      position: PropTypes.oneOfType([
        PropTypes.instanceOf(Vector3),
        PropTypes.arrayOf(PropTypes.number),
      ]),
      rotation: PropTypes.arrayOf(PropTypes.number).isRequired,
      points: PropTypes.arrayOf(PropTypes.instanceOf(Vector3)).isRequired,
    }),
  ).isRequired,
};

export default RailRenderer;

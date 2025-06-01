const Ground = () => {
  return (
    <mesh position={[0, -1, 0]} receiveShadow>
      <boxGeometry args={[100, 1, 100]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

export default Ground;

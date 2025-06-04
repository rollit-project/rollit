const Ground = () => {
  return (
    <mesh position={[0, -1, 0]} receiveShadow>
      <boxGeometry args={[100, 1, 100]} />
      <meshStandardMaterial color="#b4e07b" />
    </mesh>
  );
};

export default Ground;

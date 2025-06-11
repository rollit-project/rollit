import { useGLTF } from '@react-three/drei';

const CartModel = () => {
  const { scene } = useGLTF('/objects/cart.glb');

  return <primitive object={scene} position={[0, 2, 5]} />;
};

export default CartModel;

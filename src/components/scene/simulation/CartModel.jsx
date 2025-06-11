import { useGLTF } from '@react-three/drei';

const CartModel = () => {
  const gltf = useGLTF('/objects/cart.glb');

  if (!gltf?.scene) {
    return null;
  }

  const { scene: cart } = gltf;

  return <primitive object={cart} position={[0, 2, 5]} />;
};

export default CartModel;

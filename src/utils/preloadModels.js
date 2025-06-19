import { useGLTF } from '@react-three/drei';

export const preloadModels = () => {
  useGLTF.preload('/objects/rail/straight.glb');
  useGLTF.preload('/objects/rail/curve-left.glb');
  useGLTF.preload('/objects/rail/curve-right.glb');
  useGLTF.preload('/objects/rail/up-start.glb');
  useGLTF.preload('/objects/rail/up-middle.glb');
  useGLTF.preload('/objects/rail/up-end.glb');
  useGLTF.preload('/objects/rail/up-slope-full.glb');
  useGLTF.preload('/objects/rail/down-start.glb');
  useGLTF.preload('/objects/rail/down-middle.glb');
  useGLTF.preload('/objects/rail/down-end.glb');
  useGLTF.preload('/objects/rail/down-slope-full.glb');
  useGLTF.preload('/objects/coaster/cart.glb');
  useGLTF.preload('/objects/coaster/entrance.glb');
  useGLTF.preload('/objects/item/bench.glb');
  useGLTF.preload('/objects/item/bumper-car.glb');
  useGLTF.preload('/objects/item/coffee-cart.glb');
  useGLTF.preload('/objects/item/ferris-wheel.glb');
  useGLTF.preload('/objects/item/ice-cream-car.glb');
  useGLTF.preload('/objects/environment/tree.glb');
};

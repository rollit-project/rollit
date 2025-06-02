import bench from '@/assets/images/bench.png';
import bumperCar from '@/assets/images/bumper-car.png';
import carousel from '@/assets/images/carousel.png';
import coffeeCart from '@/assets/images/coffee-cart.png';
import coster from '@/assets/images/coster.png';
import ferrisWheel from '@/assets/images/ferris-wheel.png';
import iceCreamCar from '@/assets/images/ice-cream-car.png';
import slime from '@/assets/images/slime.png';
import steel from '@/assets/images/steel.png';
import stone from '@/assets/images/stone.png';
import vine from '@/assets/images/vine.png';

export const SCENE_ASSET_LIST = [
  {
    type: 'coster',
    name: 'coster',
    src: coster,
  },
  {
    type: 'track',
    name: 'steel',
    src: steel,
  },
  {
    type: 'track',
    name: 'stone',
    src: stone,
  },
  {
    type: 'track',
    name: 'vine',
    src: vine,
  },
  {
    type: 'track',
    name: 'slime',
    src: slime,
  },
  {
    type: 'item',
    name: 'carousel',
    src: carousel,
    model: '/objects/flying-swings.glb',
  },
  {
    type: 'item',
    name: 'bench',
    src: bench,
    model: '/objects/bench.glb',
  },
  {
    type: 'item',
    name: 'iceCreamCar',
    src: iceCreamCar,
    model: '/objects/ice-cream-car.glb',
  },
  {
    type: 'item',
    name: 'bumperCar',
    src: bumperCar,
    model: '/objects/bumper-car.glb',
  },
  {
    type: 'item',
    name: 'ferrisWheel',
    src: ferrisWheel,
    model: '/objects/ferris-wheel.glb',
  },
  {
    type: 'item',
    name: 'coffeeCart',
    src: coffeeCart,
    model: '/objects/coffee-cart.glb',
  },
];

export const getImageListByType = (type) => SCENE_ASSET_LIST.filter((item) => item.type === type);

export const getModelPathByName = (name) =>
  SCENE_ASSET_LIST.find((item) => item.name === name)?.model;

import {
  BASE_CART_SPEED,
  MIN_CART_SPEED,
  SPEED_ACCELERATION,
  SPEED_REDUCTION,
} from '@/constants/cartSpeed';

export const getCartSpeed = (direction) => {
  if (direction.y > 0) {
    const reducedSpeed = BASE_CART_SPEED - direction.y * SPEED_REDUCTION;

    return Math.max(reducedSpeed, MIN_CART_SPEED);
  }
  if (direction.y < 0) {
    return BASE_CART_SPEED + Math.abs(direction.y) * SPEED_ACCELERATION;
  }

  return BASE_CART_SPEED;
};

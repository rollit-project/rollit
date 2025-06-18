import {
  BASE_CART_SPEED,
  MIN_CART_SPEED,
  SPEED_ACCELERATION,
  SPEED_REDUCTION,
} from '@/constants/cartSpeed';

export const getCartSpeed = (direction) => {
  const isUphill = direction.y > 0;
  const isDownhill = direction.y < 0;

  if (isUphill) {
    const uphillSlowdown = direction.y * SPEED_REDUCTION;
    const reducedSpeed = BASE_CART_SPEED - uphillSlowdown;

    return Math.max(reducedSpeed, MIN_CART_SPEED);
  }

  if (isDownhill) {
    const downhillBoost = Math.abs(direction.y) * SPEED_ACCELERATION;

    return BASE_CART_SPEED + downhillBoost;
  }

  return BASE_CART_SPEED;
};

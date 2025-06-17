import { useEffect, useRef } from 'react';

import { SCROLL_ACTIVATION_ZONE, SCROLL_DIRECTION, SCROLL_SPEED } from '@/constants/scroll';

export const useAutoHorizontalScroll = () => {
  const scrollRef = useRef(null);
  const scrollAnimationRef = useRef(null);
  const scrollDirectionRef = useRef(0);

  const animateScroll = () => {
    const scrollContainer = scrollRef.current;
    const isScrollable = scrollContainer && scrollDirectionRef.current !== SCROLL_DIRECTION.NONE;

    if (isScrollable) {
      scrollContainer.scrollLeft += scrollDirectionRef.current * SCROLL_SPEED;
    }

    scrollAnimationRef.current = requestAnimationFrame(animateScroll);
  };

  const handleMouseMove = (e) => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer) {
      return;
    }

    const { left, width } = scrollContainer.getBoundingClientRect();
    const mouseXInPanel = e.clientX - left;

    const isMouseInLeftZone = mouseXInPanel < SCROLL_ACTIVATION_ZONE;
    const isMouseInRightZone = mouseXInPanel > width - SCROLL_ACTIVATION_ZONE;

    if (isMouseInLeftZone) {
      scrollDirectionRef.current = SCROLL_DIRECTION.LEFT;
    } else if (isMouseInRightZone) {
      scrollDirectionRef.current = SCROLL_DIRECTION.RIGHT;
    } else {
      scrollDirectionRef.current = SCROLL_DIRECTION.NONE;
    }
  };

  const handleMouseLeave = () => {
    scrollDirectionRef.current = SCROLL_DIRECTION.NONE;
  };

  useEffect(() => {
    scrollAnimationRef.current = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(scrollAnimationRef.current);
  }, []);

  return { scrollRef, handleMouseMove, handleMouseLeave };
};

import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import EditorActionControls from '@/components/ui/editor/EditorActionControls';
import EditorCategorySelector from '@/components/ui/editor/EditorCategorySelector';
import PanelItems from '@/components/ui/editor/PanelItems';
import { SCROLL_DIRECTION, SCROLL_HOVER_ZONE, SCROLL_SPEED } from '@/constants/scroll';
import { useSceneStore } from '@/store/useSceneStore';
import { getImageListByType } from '@/utils/sceneAssetUtils';

const EditorPanel = () => {
  const [activePanelType, setActivePanelType] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const setSelectedItem = useSceneStore((state) => state.setSelectedItem);
  const setSelectedRail = useSceneStore((state) => state.setSelectedRail);

  const scrollRef = useRef(null);
  const scrollAnimationRef = useRef(null);
  const scrollDirectionRef = useRef(0);

  const handlePanelToggle = (buttonType) => {
    setIsPanelOpen(activePanelType !== buttonType);
    setActivePanelType(activePanelType !== buttonType ? buttonType : '');
  };

  const handlePanelItemClick = (name) => {
    if (activePanelType === 'rail') {
      setSelectedRail({ name, id: uuidv4() });
    } else {
      setSelectedItem(name);
    }
  };

  const animateScroll = () => {
    const scrollElement = scrollRef.current;
    const isScrollable = scrollElement && scrollDirectionRef.current !== SCROLL_DIRECTION.NONE;

    if (isScrollable) {
      scrollElement.scrollLeft += scrollDirectionRef.current * SCROLL_SPEED;
    }

    scrollAnimationRef.current = requestAnimationFrame(animateScroll);
  };

  const handleMouseMove = (e) => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) {
      return;
    }

    const { left, width } = scrollElement.getBoundingClientRect();
    const mouseXInPanel = e.clientX - left;

    const isInLefEdge = mouseXInPanel < SCROLL_HOVER_ZONE;
    const isInRightEdge = mouseXInPanel > width - SCROLL_HOVER_ZONE;

    if (isInLefEdge) {
      scrollDirectionRef.current = SCROLL_DIRECTION.LEFT;
    } else if (isInRightEdge) {
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

  return (
    <div className="fixed bottom-0 z-50 w-full transition-transform duration-500">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full items-center justify-between">
          <EditorCategorySelector
            activePanelType={activePanelType}
            onButtonClick={handlePanelToggle}
          />
          <EditorActionControls />
        </div>
        <div
          className={`w-full overflow-hidden bg-[rgba(0,0,0,0.3)] transition-all duration-500 ${
            isPanelOpen ? 'h-[150px] pt-5' : 'h-0'
          } flex justify-start`}
        >
          <PanelItems
            ref={scrollRef}
            imageList={getImageListByType(activePanelType)}
            onClick={handlePanelItemClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;

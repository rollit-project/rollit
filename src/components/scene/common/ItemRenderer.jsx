import ItemModel from '@/components/scene/common/ItemModel';
import { useSceneStore } from '@/store/useSceneStore';

const ItemRenderer = () => {
  const placedItems = useSceneStore((state) => state.placedItems);

  return (
    <>
      {placedItems.map((item) => (
        <ItemModel
          key={item.id}
          selectedItem={item.name}
          position={item.position}
          rotation={[0, item.rotationY, 0]}
        />
      ))}
    </>
  );
};

export default ItemRenderer;

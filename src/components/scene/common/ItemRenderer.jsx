import ItemModel from '@/components/scene/common/ItemModel';
import { useItemStore } from '@/store/useItemStore';

const ItemRenderer = () => {
  const placedItems = useItemStore((state) => state.placedItems);

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

import { useDrop } from 'react-dnd';
import LayerHandler from '../LayerHandler';
import layerDragType from '../types/layerDragType';
import LayerItemDragType from '../types/LayerItemDragType';

const useDropLayer = (layerIndex: number, layerHandler: LayerHandler) => {
  const [{ isOver }, ref] = useDrop(() => ({
    accept: layerDragType,

    hover: () => {
      console.log('hovering');
    },

    drop: (item: LayerItemDragType) => {
      layerHandler.moveLayer(item.layerAdapter, layerIndex);
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return {
    isOver,
    ref,
  };
};

export default useDropLayer;

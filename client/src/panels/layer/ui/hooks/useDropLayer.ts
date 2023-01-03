import LayerHandler from '@/panels/layer/model/LayerHandler';
import layerDragType from '@/panels/layer/model/layerDragType';
import { useDrop } from 'react-dnd';
import LayerItemDragType from '../../model/LayerItemDragType';

const useDropLayer = (layerIndex: number, layerHandler: LayerHandler) => {
  const [{ isOver }, ref] = useDrop(() => ({
    accept: layerDragType,

    hover: () => {
      console.log('hovering');
    },

    drop: (item: LayerItemDragType) => {
      layerHandler.setLayerIndex(item.layerAdapter, layerIndex);
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

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
      const sourceLayer = item.layerAdapter;
      const sourceLayerIndex = layerHandler.getLayerIndex(sourceLayer);
      if (layerIndex !== layerHandler.getLayerIndex(item.layerAdapter)) {
        layerHandler.removeLayer(sourceLayer);
        const targetIndex = sourceLayerIndex < layerIndex ? layerIndex - 1 : layerIndex;
        layerHandler.insertLayer(sourceLayer, targetIndex);
      }
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

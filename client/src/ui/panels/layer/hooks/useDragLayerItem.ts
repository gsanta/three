import { useDrag } from 'react-dnd';
import LayerAdapter from '../LayerAdapter';
import layerDragType from '../types/layerDragType';

const useDragLayerItem = (layerAdapter: LayerAdapter) => {
  const [{ opacity }, source] = useDrag(
    () => ({
      type: layerDragType,
      item: { layerAdapter },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [],
  );

  return {
    opacity,
    source,
  };
};

export default useDragLayerItem;

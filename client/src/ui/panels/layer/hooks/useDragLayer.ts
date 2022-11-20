import { useDrag } from 'react-dnd';
import LayerAdapter from '../LayerAdapter';
import layerDragType from '../types/layerDragType';

const useDragLayer = (layerAdapter: LayerAdapter) => {
  const [{ opacity }, ref] = useDrag(
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
    ref,
  };
};

export default useDragLayer;

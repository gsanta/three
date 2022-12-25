import LayerAdapter from '@/panels/layer/model/LayerAdapter';
import { useDrag } from 'react-dnd';
import layerDragType from '../../model/layerDragType';

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

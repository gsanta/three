import { useDrag } from 'react-dnd';
import layerDragType from '../layerDragType';
import Layer from '../../state/Layer';

const useDragLayer = (layer: Layer) => {
  const [{ opacity }, ref] = useDrag(
    () => ({
      type: layerDragType,
      item: { layer },
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

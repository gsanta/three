import { useAppDispatch } from '@/hooks';
import layerDragType from '@/panels/layer/ui/layerDragType';
import { useDrop } from 'react-dnd';
import LayerItemDragType from '../LayerItemDragType';
import { setLayerIndex } from '../../state/layerSlice';

const useDropLayer = (layerIndex: number) => {
  const dispatch = useAppDispatch();

  const [{ isOver }, ref] = useDrop(() => ({
    accept: layerDragType,

    hover: () => {
      console.log('hovering');
    },

    drop: (item: LayerItemDragType) => {
      dispatch(setLayerIndex({ layer: item.layer, newLayerIndex: layerIndex }));
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

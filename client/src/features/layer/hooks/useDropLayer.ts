import { useAppDispatch } from '@/hooks';
import layerDragType from '@/features/layer/types/layerDragType';
import { useDrop } from 'react-dnd';
import LayerItemDragType from '../types/LayerItemDragType';
import { setLayerIndex } from '../state/layerSlice';

const useDropLayer = (layerIndex: number) => {
  const dispatch = useAppDispatch();

  const [{ isOver }, ref] = useDrop(() => ({
    accept: layerDragType,

    hover: () => {
      console.log('hovering');
    },

    drop: (item: LayerItemDragType) => {
      dispatch(setLayerIndex({ oldLayerIndex: item.index, newLayerIndex: layerIndex }));
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

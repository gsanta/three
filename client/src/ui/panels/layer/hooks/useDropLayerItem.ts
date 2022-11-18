import { useDrop } from 'react-dnd';
import LayerAdapter from '../LayerAdapter';
import LayerHandler from '../LayerHandler';
import layerDragType from '../types/layerDragType';
import LayerItemDragType from '../types/LayerItemDragType';

const useDropLayerItem = (targetLayer: LayerAdapter, layerHandler: LayerHandler) => {
  const [, source] = useDrop(() => ({
    accept: layerDragType,
    drop: (item: LayerItemDragType) => {
      const sourceLayer = item.layerAdapter;
      alert(
        layerHandler
          .getLayers()
          .map((layer) => layer.getName())
          .join(', '),
      );
      if (targetLayer !== sourceLayer) {
        layerHandler.removeLayer(sourceLayer);
        const targetIndex = layerHandler.getLayerIndex(targetLayer);
        alert(targetLayer.getName() + ', ' + targetIndex);
        layerHandler.insertLayer(sourceLayer, targetIndex + 1);
      }
    },
  }));

  return {
    source,
  };
};

export default useDropLayerItem;

import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks';
import ToggleButton from '@/common/components/ToggleButton';
import Icon from '@/common/components/icon/Icon';
import { Button, ListItem, Tooltip } from '@chakra-ui/react';
import React from 'react';
import Layer from '../state/Layer';
import { removeLayer, setLayerVisible } from '../state/layerSlice';
import useDragLayer from '../hooks/useDragLayer';

type LayerItemProps = {
  layer: Layer;
  isActive: boolean;
  setActiveLayer(): void;
  isDeleteDisabled: boolean;
};

const LayerItem = ({ isActive, layer, setActiveLayer, isDeleteDisabled }: LayerItemProps) => {
  const layers = useAppSelector((state) => state.layer.layers);
  const dispatch = useAppDispatch();

  const handleLayerDelete = () => dispatch(removeLayer(layer));
  const handleToggleLayerVisible = () => {
    const index = layers.indexOf(layer);
    const visible = !layer.visible;
    dispatch(setLayerVisible({ index, visible }));
  };

  const { opacity, ref } = useDragLayer(layer);

  return (
    <ListItem ref={ref} display="flex" gap="2" sx={{ opacity }}>
      <ToggleButton className="iconOnly" size="sm" toggle={layer.visible} onToggle={() => handleToggleLayerVisible()}>
        <Icon name="BsFillEyeFill" />
      </ToggleButton>
      <ToggleButton toggle={isActive} onToggle={setActiveLayer} size="sm" width="100%">
        {layer.name}
      </ToggleButton>
      <Tooltip label={isDeleteDisabled ? "can't remove last layer" : 'remove layer'}>
        <Button className="iconOnly" onClick={handleLayerDelete} size="sm" isDisabled={isDeleteDisabled}>
          <Icon name="BiTrashAlt" />
        </Button>
      </Tooltip>
    </ListItem>
  );
};

export default LayerItem;

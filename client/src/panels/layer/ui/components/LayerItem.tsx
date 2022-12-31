import LayerAdapter from '@/panels/layer/model/LayerAdapter';
import ToggleButton from '@/ui/components/button/ToggleButton';
import Icon from '@/ui/components/icon/Icon';
import useAppContext from '@/ui/hooks/useAppContext';
import { Button, ListItem } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import useDragLayer from '../hooks/useDragLayer';

type LayerItemProps = {
  layerAdapter: LayerAdapter;
  isActive: boolean;
  setActiveLayer(): void;
};

const LayerItem = observer(({ isActive, layerAdapter, setActiveLayer }: LayerItemProps) => {
  const { layerHandler } = useAppContext();

  const handleLayerDelete = () => layerHandler.removeLayer(layerAdapter);

  const { opacity, ref } = useDragLayer(layerAdapter);

  return (
    <ListItem ref={ref} display="flex" gap="2" sx={{ opacity }}>
      <ToggleButton
        className="iconOnly"
        toggle={layerAdapter.isVisible()}
        onToggle={() => layerAdapter.setVisible(!layerAdapter.isVisible())}
      >
        <Icon name="BsFillEyeFill" />
      </ToggleButton>
      <ToggleButton toggle={isActive} onToggle={setActiveLayer} width="100%">
        {layerAdapter.getName()}
      </ToggleButton>
      <Button className="iconOnly" onClick={handleLayerDelete}>
        <Icon name="BiTrashAlt" />
      </Button>
    </ListItem>
  );
});

export default LayerItem;

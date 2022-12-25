import LayerAdapter from '@/panels/layer/model/LayerAdapter';
import Button from '@/ui/components/button/Button';
import useAppContext from '@/ui/hooks/useAppContext';
import { ListItem } from '@chakra-ui/react';
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
      <Button
        iconName="BsFillEyeFill"
        toggle={layerAdapter.isVisible() ? 'on' : 'off'}
        onToggle={() => layerAdapter.setVisible(!layerAdapter.isVisible())}
      />
      <Button toggle={isActive ? 'on' : 'off'} onToggle={setActiveLayer} width="100%">
        {layerAdapter.getName()}
      </Button>
      <Button iconName="BiTrashAlt" onClick={handleLayerDelete} />
    </ListItem>
  );
});

export default LayerItem;

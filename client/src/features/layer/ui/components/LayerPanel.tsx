import Panel from '@/components/panel/Panel';
import { List, Tooltip, Button } from '@chakra-ui/react';
import { useBoolean } from 'usehooks-ts';
import React from 'react';
import LayerItem from './LayerItem';
import AddLayerDialog from './AddLayerDialog';
import LayerDropTarget from './LayerDropTarget';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Icon from '@/components/icon/Icon';
import Frames from '../../../frame/components/Frames';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setActiveLayer } from '../../state/layerSlice';

const LayerPanel = () => {
  const { value: isAddPanelOpen, setTrue: setOpenAddPanel, setFalse: setCloseAddPanel } = useBoolean(false);
  const dispatch = useAppDispatch();

  const layers = useAppSelector((state) => state.layer.layers);
  const activeLayer = useAppSelector((state) => state.layer.activeLayer);

  return (
    <Panel
      header={
        <Panel.Header title="layers & frames">
          <Tooltip label="new layer">
            <Button className="iconOnly" onClick={setOpenAddPanel} size="sm">
              <Icon name="BiPlus" />
            </Button>
          </Tooltip>
        </Panel.Header>
      }
      height="100%"
    >
      <DndProvider backend={HTML5Backend}>
        <List flex="1">
          <LayerDropTarget layerIndex={0} />
          {layers.map((layer, index) => (
            <React.Fragment key={layer.name}>
              <LayerItem
                isActive={layer.index === activeLayer?.index}
                key={layer.name}
                layer={layer}
                setActiveLayer={() => dispatch(setActiveLayer(layer))}
                isDeleteDisabled={layers.length === 1}
              />
              <LayerDropTarget key={index + 1} layerIndex={index + 1} />
            </React.Fragment>
          ))}
        </List>
      </DndProvider>
      <Frames />
      <AddLayerDialog isOpen={isAddPanelOpen} onClose={setCloseAddPanel} />
    </Panel>
  );
};

export default LayerPanel;

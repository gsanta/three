import Panel from '@/ui/components/panel/Panel';
import useAppContext from '@/ui/hooks/useAppContext';
import { List, Box, Tooltip, Button } from '@chakra-ui/react';
import { useBoolean } from 'usehooks-ts';
import { observer } from 'mobx-react-lite';
import React from 'react';
import LayerItem from './LayerItem';
import LayerDialog from './LayerDialog';
import LayerDropTarget from './LayerDropTarget';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Icon from '@/ui/components/icon/Icon';

const LayerPanel = observer(() => {
  const { value: isAddPanelOpen, setTrue: setOpenAddPanel, setFalse: setCloseAddPanel } = useBoolean(false);
  const { layerHandler } = useAppContext();

  return (
    <Panel
      header={
        <Panel.Header title="layers">
          <Tooltip label="new layer">
            <Button className="iconOnly" onClick={setOpenAddPanel}>
              <Icon name="BiPlus" />
            </Button>
          </Tooltip>
        </Panel.Header>
      }
    >
      <DndProvider backend={HTML5Backend}>
        <Box paddingInline="2" paddingBlock="3">
          <List display="flex" flexDir="column" justifyContent="space-between">
            <LayerDropTarget layerIndex={0} />
            {layerHandler.getLayers().map((layerAdapter, index) => (
              <React.Fragment key={layerAdapter.getName()}>
                <LayerItem
                  isActive={layerAdapter === layerHandler.getActiveLayer()}
                  layerAdapter={layerAdapter}
                  setActiveLayer={() => layerHandler.setActiveLayer(layerAdapter)}
                />
                <LayerDropTarget layerIndex={index + 1} />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </DndProvider>
      <LayerDialog isOpen={isAddPanelOpen} onClose={setCloseAddPanel} />
    </Panel>
  );
});

export default LayerPanel;

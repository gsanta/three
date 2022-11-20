import Button from '@/ui/components/button/Button';
import Panel from '@/ui/components/panel/Panel';
import useAppContext from '@/ui/hooks/useAppContext';
import { List, Box, Tooltip } from '@chakra-ui/react';
import { useBoolean } from 'usehooks-ts';
import { observer } from 'mobx-react-lite';
import React from 'react';
import LayerItem from './LayerItem';
import LayerDialog from './LayerDialog';
import LayerDropTarget from './LayerDropTarget';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const LayerPanel = observer(() => {
  const { value: isAddPanelOpen, setTrue: setOpenAddPanel, setFalse: setCloseAddPanel } = useBoolean(false);
  const { layerHandler } = useAppContext();

  return (
    <Panel
      header={
        <Panel.Header title="layers">
          <Tooltip label="add">
            <Button iconName="BiPlus" level="secondary" onClick={setOpenAddPanel} />
          </Tooltip>
        </Panel.Header>
      }
    >
      <DndProvider backend={HTML5Backend}>
        <Box paddingInline="2" paddingBlock="3">
          <List display="flex" flexDir="column" justifyContent="space-between">
            <LayerDropTarget key={0} layerIndex={0} />
            {layerHandler.getLayers().map((layerAdapter, index) => (
              <>
                <LayerItem
                  isActive={layerAdapter === layerHandler.getActiveLayer()}
                  key={layerAdapter.getName()}
                  layerAdapter={layerAdapter}
                  setActiveLayer={() => layerHandler.setActiveLayer(layerAdapter)}
                />
                <LayerDropTarget key={index} layerIndex={index + 1} />
              </>
            ))}
          </List>
        </Box>
      </DndProvider>
      <LayerDialog isOpen={isAddPanelOpen} onClose={setCloseAddPanel} />
    </Panel>
  );
});

export default LayerPanel;

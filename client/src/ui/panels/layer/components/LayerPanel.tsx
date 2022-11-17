import Button from '@/ui/components/button/Button';
import Panel from '@/ui/components/panel/Panel';
import useAppContext from '@/ui/hooks/useAppContext';
import { List, Box, Tooltip, Input } from '@chakra-ui/react';
import { useBoolean } from 'usehooks-ts';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import LayerItem from '../LayerItem';
import LayerDialog from './LayerDialog';

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
      <Box paddingInline="2" paddingBlock="3">
        <List spacing={3} display="flex" flexDir="column" justifyContent="space-between">
          {layerHandler.getLayers().map((layerAdapter) => (
            <LayerItem
              layerAdapter={layerAdapter}
              isActive={layerAdapter === layerHandler.getActiveLayer()}
              setActiveLayer={() => layerHandler.setActiveLayer(layerAdapter)}
            />
          ))}
        </List>
      </Box>
      <LayerDialog isOpen={isAddPanelOpen} onClose={setCloseAddPanel} />
    </Panel>
  );
});

export default LayerPanel;

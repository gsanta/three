import ToolName from '@/panels/toolbar/model/ToolName';
import { observer } from 'mobx-react-lite';
import React from 'react';
import ColorPicker from '@/ui/components/color_picker/ColorPicker';
import useAppContext from '@/ui/hooks/useAppContext';
import { Tooltip } from '@chakra-ui/react';
import Box from '@/ui/components/box/Box';
import Button from '@/ui/components/button/Button';

const Toolbar = observer(() => {
  const { toolStore, editorStore } = useAppContext();

  const handleSelectTool = (name: string) => {
    toolStore.setSelectedTool(name as ToolName);
  };

  return (
    <Box
      bgColor="blackAlpha.800"
      height="100%"
      paddingBlockStart="1"
      paddingBlockEnd="1"
      display="flex"
      flexDirection="column"
      gap="1"
      alignItems="center"
    >
      {toolStore?.tools.map(({ iconName, name }) => {
        const toggle = name === toolStore.getSelectedTool()?.name ? 'on' : 'off';
        return (
          <Tooltip label={name} placement="right">
            <Button key={name} iconName={iconName} toggle={toggle} onToggle={() => handleSelectTool(name)} />
          </Tooltip>
        );
      })}

      <ColorPicker editorStore={editorStore} />
    </Box>
  );
});

export default Toolbar;

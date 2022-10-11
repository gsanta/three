import ToolName from '@/services/tool/ToolName';
import ToolStore from '@/services/tool/ToolStore';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Box from '../../components/box/Box';
import Button from '../../components/button/Button';

type ToolbarProps = {
  toolStore?: ToolStore;
};

const Toolbar = observer(({ toolStore }: ToolbarProps) => {
  const handleSelectTool = (name: string) => {
    toolStore?.setSelectedTool(name as ToolName);
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
        return <Button key={name} iconName={iconName} toggle={toggle} onToggle={() => handleSelectTool(name)} />;
      })}
    </Box>
  );
});

export default Toolbar;

import ToolName from '@/panels/toolbar/model/ToolName';
import { observer } from 'mobx-react-lite';
import React from 'react';
import useAppContext from '@/ui/hooks/useAppContext';
import { Tooltip } from '@chakra-ui/react';
import Box from '@/ui/components/box/Box';
import ToggleButton from '@/ui/components/button/ToggleButton';
import Icon from '@/ui/components/icon/Icon';

const Toolbar = observer(() => {
  const { toolStore } = useAppContext();

  const handleSelectTool = (name: string) => {
    toolStore.setSelectedTool(name as ToolName);
  };

  return (
    <Box
      height="100%"
      paddingBlockStart="1"
      paddingBlockEnd="1"
      display="flex"
      flexDirection="column"
      gap="1"
      alignItems="center"
    >
      {toolStore?.tools.map(({ iconName, name }) => {
        const toggle = name === toolStore.getSelectedTool()?.name;
        return (
          <Tooltip key={name} label={name} placement="right">
            <ToggleButton
              className="iconOnly"
              toggle={toggle}
              onToggle={() => handleSelectTool(name)}
              variant="outline"
            >
              <Icon name={iconName} />
            </ToggleButton>
          </Tooltip>
        );
      })}
    </Box>
  );
});

export default Toolbar;

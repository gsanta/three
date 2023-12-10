import ToolName from '@/features/tool/state/ToolName';
import React from 'react';
import { Box, Tooltip } from '@chakra-ui/react';
import ToggleButton from '@/common/components/ToggleButton';
import Icon from '@/common/components/icon/Icon';
import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks';
import { setSelectedTool } from '@/features/tool/state/toolSlice';

const Toolbar = () => {
  const tools = useAppSelector((state) => state.tool.tools);
  const selectedTool = useAppSelector((state) => state.tool.selectedTool);
  const dispatch = useAppDispatch();

  const handleSelectTool = (name: string) => {
    dispatch(setSelectedTool(name as ToolName));
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
      {tools.map(({ iconName, name }) => {
        const toggle = name === selectedTool;
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
};

export default Toolbar;

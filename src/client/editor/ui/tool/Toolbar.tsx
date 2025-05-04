import React from 'react';
import { Box, Text, Tooltip } from '@chakra-ui/react';
import ToggleButton from '../../../common/components/lib/ToggleButton';
import Icon from '../../../common/components/lib/Icon';
import { useAppSelector } from '../../../common/hooks/hooks';
import useEditorContext from '@/app/editor/useEditorContext';
import ToolName from '../../models/tool/ToolName';

const Toolbar = () => {
  const { tool } = useEditorContext();
  const selectedTool = useAppSelector((state) => state.tool.selectedTool);

  const handleSelectTool = (name: ToolName) => {
    tool.setSelectedTool(name as ToolName);
  };

  return (
    <Box
      className="bg-base-300"
      height="100%"
      paddingBlockStart="8"
      paddingBlockEnd="1"
      display="flex"
      flexDirection="column"
      gap="8"
      alignItems="center"
    >
      {tool.getTools().map(({ iconName, name, showOnToolbar }) => {
        if (!showOnToolbar) {
          return;
        }

        const toggle = name === selectedTool;
        return (
          <Tooltip key={name} label={name} placement="right">
            <ToggleButton
              className="iconOnly"
              colorScheme="red"
              toggle={toggle}
              onToggle={() => handleSelectTool(name)}
              tooltip={name}
              variant="outline"
            >
              {iconName ? <Icon name={iconName} /> : <Text>{name[0].toUpperCase()}</Text>}
            </ToggleButton>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default Toolbar;

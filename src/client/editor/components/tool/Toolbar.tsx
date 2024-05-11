import React from 'react';
import { Box, Text, Tooltip } from '@chakra-ui/react';
import ToggleButton from '../../../common/components/ToggleButton';
import Icon from '../../../common/components/icon/Icon';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import useEditorContext from '@/app/editor/EditorContext';
import ToolName from '../../types/ToolName';
import { setSelectedTool } from '../../stores/tool/toolSlice';

const Toolbar = () => {
  const { tool } = useEditorContext();
  const { selectedTool } = useAppSelector((state) => state.tool);
  const dispatch = useAppDispatch();

  const handleSelectTool = (name: ToolName) => {
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
      {tool.getTools().map(({ iconName, name, showOnToolbar }) => {
        if (!showOnToolbar) {
          return;
        }

        const toggle = name === selectedTool;
        return (
          <Tooltip key={name} label={name} placement="right">
            <ToggleButton
              className="iconOnly"
              toggle={toggle}
              onToggle={() => handleSelectTool(name)}
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

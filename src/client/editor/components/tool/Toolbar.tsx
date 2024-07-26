import React from 'react';
import { Box, Text, Tooltip } from '@chakra-ui/react';
import ToggleButton from '../../../common/components/ToggleButton';
import Icon from '../../../common/components/icon/Icon';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import useEditorContext from '@/app/editor/EditorContext';
import ToolName from '../../types/ToolName';
import { setCityMode } from '../../stores/editorSlice';

const Toolbar = () => {
  const { tool } = useEditorContext();
  const selectedTool = useAppSelector((state) => state.tool.selectedTool);
  const mode = useAppSelector((state) => state.editor.mode);
  const dispatch = useAppDispatch();

  const handleSelectTool = (name: ToolName) => {
    tool.setSelectedTool(name as ToolName);
  };

  const handleModeChange = () => {
    if (mode === 'city') {
      handleSelectTool(ToolName.RoomModel);
    } else {
      dispatch(setCityMode());
    }
  };

  return (
    <Box
      height="100%"
      paddingBlockStart="1"
      paddingBlockEnd="1"
      display="flex"
      flexDirection="column"
      gap="3"
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
              variant="outline"
            >
              {iconName ? <Icon name={iconName} /> : <Text>{name[0].toUpperCase()}</Text>}
            </ToggleButton>
          </Tooltip>
        );
      })}

      <Tooltip key="room-tool" label="Room" placement="right">
        <ToggleButton
          className="iconOnly"
          colorScheme="red"
          toggle={selectedTool === ToolName.RoomModel}
          onToggle={handleModeChange}
          variant="outline"
        >
          <Icon src="/icons/room_icon.png" />
        </ToggleButton>
      </Tooltip>
    </Box>
  );
};

export default Toolbar;

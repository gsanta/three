import ToolName from '@/features/tool/state/ToolName';
import BrushToolOptions from './BrushToolOptions';
import Panel from '@/components/Panel';
import React from 'react';
import ColorPicker from '@/components/color_picker/ColorPicker';
import { useAppSelector } from '@/hooks';
import CircleToolOptions from './CircleToolOptions';
import RectangleToolOptions from './RectangleToolOptions';
import EraseToolOptions from './EraseToolOptions';
import { Box } from '@chakra-ui/react';

const ToolOptionsPanel = () => {
  const selectedTool = useAppSelector((state) => state.tool.selectedTool);

  const getOptions = () => {
    switch (selectedTool) {
      case ToolName.Brush:
        return <BrushToolOptions />;
      case ToolName.Circle:
        return <CircleToolOptions />;
      case ToolName.Rectangle:
        return <RectangleToolOptions />;
      case ToolName.Erase:
        return <EraseToolOptions />;
      default:
        return null;
    }
  };

  return (
    <Panel>
      <Box paddingInline="2" paddingBottom="4">
        <ColorPicker />
      </Box>
      <Panel.Header title="Tool options" />
      {getOptions()}
    </Panel>
  );
};

export default ToolOptionsPanel;

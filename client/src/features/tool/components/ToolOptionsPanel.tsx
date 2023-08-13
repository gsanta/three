import ToolName from '@/features/tool/state/ToolName';
import BrushToolOptions from './BrushToolOptions';
import Panel from '@/components/Panel';
import React from 'react';
import ColorPicker from '@/components/color_picker/ColorPicker';
import { useAppSelector } from '@/hooks';
import CircleToolOptions from './CircleToolOptions';
import RectangleToolOptions from './RectangleToolOptions';

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
      default:
        return null;
    }
  };

  return (
    <Panel>
      <ColorPicker />
      {getOptions()}
    </Panel>
  );
};

export default ToolOptionsPanel;

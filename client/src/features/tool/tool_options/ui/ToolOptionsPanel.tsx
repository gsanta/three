import ToolName from '@/features/tool/state/ToolName';
import BrushToolOptions from './BrushToolOptions';
import Panel from '@/components/panel/Panel';
import React from 'react';
import ColorPicker from '@/components/color_picker/ColorPicker';
import { useAppSelector } from '@/hooks';
import CircleToolOptions from './CircleToolOptions';

const ToolOptionsPanel = () => {
  const selectedTool = useAppSelector((state) => state.tool.selectedTool);

  const getOptions = () => {
    switch (selectedTool) {
      case ToolName.Brush:
        return <BrushToolOptions />;
      case ToolName.Circle:
        return <CircleToolOptions />;
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

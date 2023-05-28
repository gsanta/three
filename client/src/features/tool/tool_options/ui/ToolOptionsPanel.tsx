import ToolName from '@/features/tool/state/ToolName';
import BrushToolOptions from './BrushToolOptions';
import Panel from '@/components/panel/Panel';
import React from 'react';
import ColorPicker from '@/components/color_picker/ColorPicker';
import { useAppSelector } from '@/hooks';

const ToolOptionsPanel = () => {
  const selectedTool = useAppSelector((state) => state.tool.selectedTool);

  const getOptions = () => {
    switch (selectedTool) {
      case ToolName.Brush:
        return <BrushToolOptions />;
      default:
        return null;
    }
  };

  return (
    <Panel>
      {getOptions()}
      <ColorPicker />
    </Panel>
  );
};

export default ToolOptionsPanel;

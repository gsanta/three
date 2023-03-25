import ToolName from '@/features/tool/state/ToolName';
import BrushToolOptions from './BrushToolOptions';
import Panel from '@/ui/components/panel/Panel';
import React from 'react';
import ColorPicker from '@/ui/components/color_picker/ColorPicker';
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
    <Panel header={<Panel.Header title="tool options"></Panel.Header>}>
      {getOptions()}
      <ColorPicker />
    </Panel>
  );
};

export default ToolOptionsPanel;

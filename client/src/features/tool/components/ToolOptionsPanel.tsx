import ToolName from '@/features/tool/state/ToolName';
import BrushToolOptions from './BrushToolOptions';
import Panel from '@/common/components/Panel';
import React from 'react';
import { useAppSelector } from '@/common/hooks/hooks';
import CircleToolOptions from './CircleToolOptions';
import RectangleToolOptions from './RectangleToolOptions';
import EraseToolOptions from './EraseToolOptions';
import SelectToolOptions from './SelectToolOptions';
import BuilderOptions from './BuilderOptions';

const ToolOptionsPanel = () => {
  const selectedTool = useAppSelector((state) => state.tool.selectedTool);

  const getOptions = () => {
    switch (selectedTool) {
      case ToolName.Add:
        return <BuilderOptions />;
      case ToolName.Brush:
        return <BrushToolOptions />;
      case ToolName.Circle:
        return <CircleToolOptions />;
      case ToolName.Rectangle:
        return <RectangleToolOptions />;
      case ToolName.Erase:
        return <EraseToolOptions />;
      case ToolName.SelectionRectangle:
        return <SelectToolOptions />;
      default:
        return null;
    }
  };

  return <Panel header={<Panel.Header title="Tool options" />}>{getOptions()}</Panel>;
};

export default ToolOptionsPanel;

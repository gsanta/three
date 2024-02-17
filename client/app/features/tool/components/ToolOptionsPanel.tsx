import ToolName from '@/features/tool/state/ToolName';
import Panel from '../../../common/components/Panel';
import React from 'react';
import { useAppSelector } from '@/common/hooks/hooks';
import BuilderOptions from './BuilderOptions';

const ToolOptionsPanel = () => {
  const selectedTool = useAppSelector((state) => state.tool.selectedTool);

  const getOptions = () => {
    switch (selectedTool) {
      case ToolName.Add:
        return <BuilderOptions />;
      default:
        return null;
    }
  };

  return <Panel header={<Panel.Header title="Tool options" />}>{getOptions()}</Panel>;
};

export default ToolOptionsPanel;

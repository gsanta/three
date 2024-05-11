import ToolName from '../../types/ToolName';
import Panel from '../../../common/components/Panel';
import React from 'react';
import { useAppSelector } from '../../../common/hooks/hooks';
import AddToolOptions from './AddToolOptions';
import SelectToolOptions from './SelectToolOptions';
import CableToolOptions from '@/client/editor/components/tool/CableToolOptions';

const ToolOptionsPanel = () => {
  const selectedTool = useAppSelector((state) => state.tool.selectedTool);

  const getOptions = () => {
    switch (selectedTool) {
      case ToolName.Add:
        return <AddToolOptions />;
      case ToolName.Select:
        return <SelectToolOptions />;
      case ToolName.Cable:
        return <CableToolOptions />;
      default:
        return null;
    }
  };

  return <Panel header={<Panel.Header title="Tool options" />}>{getOptions()}</Panel>;
};

export default ToolOptionsPanel;

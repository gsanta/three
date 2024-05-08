import ToolName from '../state/ToolName';
import Panel from '../../../../common/components/Panel';
import React from 'react';
import { useAppSelector } from '../../../../common/hooks/hooks';
import AddToolOptions from '../../block/use_cases/add/AddToolOptions';
import SelectToolOptions from '../../block/use_cases/select/SelectToolOptions';
import CableToolOptions from '@/client/editor/features/block/components/CableToolOptions';

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

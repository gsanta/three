import ToolName from '../state/ToolName';
import Panel from '../../../../common/components/Panel';
import React from 'react';
import { useAppSelector } from '../../../../common/hooks/hooks';
import AddToolOptions from '../../../features/block/ui/AddToolOptions';
import SelectToolOptions from '../../../features/block/ui/SelectToolOptions';
import CableToolOptions from '@/client/editor/features/block/ui/CableToolOptions';

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

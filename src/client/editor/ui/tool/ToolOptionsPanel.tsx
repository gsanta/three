import ToolName from '../../models/tool/ToolName';
import Panel from '../../../common/components/globals/Panel';
import React from 'react';
import { useAppSelector } from '../../../common/hooks/hooks';
import AddToolOptions from './AddToolOptions';
import SelectToolOptions from './SelectToolOptions';

const ToolOptionsPanel = () => {
  const selectedTool = useAppSelector((state) => state.tool.selectedTool);

  const getOptions = () => {
    switch (selectedTool) {
      case ToolName.Add:
        return <AddToolOptions />;
      case ToolName.Select:
        return <SelectToolOptions />;
      default:
        return null;
    }
  };

  return <Panel header={<Panel.Header title="Tool options" />}>{getOptions()}</Panel>;
};

export default ToolOptionsPanel;

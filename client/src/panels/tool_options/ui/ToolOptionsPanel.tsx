import ToolName from '@/panels/toolbar/model/ToolName';
import BrushToolOptions from './BrushToolOptions';
import Panel from '@/ui/components/panel/Panel';
import useAppContext from '@/ui/hooks/useAppContext';
import { observer } from 'mobx-react-lite';
import React from 'react';
import ColorPicker from '@/ui/components/color_picker/ColorPicker';

const ToolOptionsPanel = observer(() => {
  const { toolStore } = useAppContext();

  const getOptions = () => {
    switch (toolStore.getSelectedTool()?.name) {
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
});

export default ToolOptionsPanel;

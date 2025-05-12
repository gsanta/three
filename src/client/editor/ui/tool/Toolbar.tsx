import React from 'react';
import ToggleButton from '../../../common/components/lib/ToggleButton';
import Icon from '../../../common/components/lib/Icon';
import { useAppSelector } from '../../../common/hooks/hooks';
import useEditorContext from '@/app/editor/useEditorContext';
import ToolName from '../../models/tool/ToolName';

const Toolbar = () => {
  const { tool } = useEditorContext();
  const selectedTool = useAppSelector((state) => state.tool.selectedTool);

  const handleSelectTool = (name: ToolName) => {
    tool.setSelectedTool(name as ToolName);
  };

  return (
    <div className="bg-base-300 h-full pt-2 pb-1 flex flex-col gap-1 items-center">
      {tool.getTools().map(({ iconName, name, showOnToolbar }) => {
        if (!showOnToolbar) {
          return;
        }

        const toggle = name === selectedTool;
        return (
          <ToggleButton toggle={toggle} onToggle={() => handleSelectTool(name)} tooltip={name}>
            {iconName ? <Icon name={iconName} /> : <p>{name[0].toUpperCase()}</p>}
          </ToggleButton>
        );
      })}
    </div>
  );
};

export default Toolbar;

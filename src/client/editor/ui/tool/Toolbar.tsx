import React from 'react';
import ToggleButton from '../../../common/components/lib/ToggleButton';
import Icon from '../../../common/components/lib/Icon';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import useEditorContext from '@/app/editor/useEditorContext';
import ToolName from '../../models/tool/ToolName';
import IconButton from '@/client/common/components/lib/IconButton';
import { undoAction, redoAction } from '../../stores/block/blockActions';

const Toolbar = () => {
  const { tool } = useEditorContext();
  const selectedTool = useAppSelector((state) => state.tool.selectedTool);

  const handleSelectTool = (name: ToolName) => {
    tool.setSelectedTool(name as ToolName);
  };

  const undoSize = useAppSelector((state) => state.blockCategory.undoSize);
  const isUndoDisabled = undoSize === 0;

  const redoSize = useAppSelector((state) => state.blockCategory.redoSize);
  const isRedoDisabled = redoSize === 0;

  const dispatch = useAppDispatch();

  const handleUndo = () => {
    dispatch(undoAction());
  };

  const handleRedo = () => {
    dispatch(redoAction());
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

      <div className="divider w-full" />
      <IconButton iconName="BiUndo" isDisabled={isUndoDisabled} onClick={handleUndo} tooltip="Undo" />
      <IconButton iconName="BiRedo" isDisabled={isRedoDisabled} onClick={handleRedo} tooltip="Redo" />
    </div>
  );
};

export default Toolbar;

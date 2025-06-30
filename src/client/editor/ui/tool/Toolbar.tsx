import React from 'react';
import ToggleButton from '../../../common/components/lib/ToggleButton';
import Icon from '../../../common/components/lib/Icon';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import useEditorContext from '@/app/editor/useEditorContext';
import ToolName from '../../models/tool/ToolName';
import IconButton from '@/client/common/components/lib/IconButton';
import { undoAction, redoAction } from '../../stores/block/blockActions';
import useDialog from '../hooks/useDialog';
import AddDialog from '../scene/components/AddDialog';
import PlayerDialog from '../scene/components/PlayerDialog';

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

  const {
    isDialogOpen: isAddDialogOpen,
    onDialogClose: onAddDialogClose,
    onDialogOpen: onAddDialogOpen,
  } = useDialog({ dialogId: 'add-dialog' });

  const {
    isDialogOpen: isPlayerDialogOpen,
    onDialogClose: onPlayerDialogClose,
    onDialogOpen: onPlayerDialogOpen,
  } = useDialog({ dialogId: 'player-dialog' });

  return (
    <div className="bg-base-300 h-full pt-2 pb-1 flex flex-col justify-between gap-1 items-center">
      <div className="flex flex-col gap-1 items-center">
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
      <div className="flex flex-col gap-1 items-center pb-2">
        <ToggleButton toggle={isPlayerDialogOpen} onToggle={onPlayerDialogOpen}>
          <Icon name="BiUser" />
        </ToggleButton>
        <ToggleButton toggle={isAddDialogOpen} onToggle={onAddDialogOpen}>
          <Icon name="BiBuildingHouse" />
        </ToggleButton>
      </div>
      <AddDialog isOpen={isAddDialogOpen} onClose={onAddDialogClose} />
      <PlayerDialog isOpen={isPlayerDialogOpen} onClose={onPlayerDialogClose} />
    </div>
  );
};

export default Toolbar;

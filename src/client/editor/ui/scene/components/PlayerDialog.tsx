import React, { useState } from 'react';
import { useAppSelector } from '@/client/common/hooks/hooks';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';
import useEditorContext from '@/app/editor/useEditorContext';
import MovePanel from './MovePanel';
import Icon from '@/client/common/components/lib/Icon';
import ToggleButton from '@/client/common/components/lib/ToggleButton';
import BuildPanel from './BuildPanel';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import ToolName from '@/client/editor/models/tool/ToolName';
import PlayerDecorator from '@/client/editor/models/block/categories/PlayerDecorator';
import IconButton from '@/client/common/components/lib/IconButton';

const PlayerDialog = (props: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
  const [activePanel, setActivePanel] = useState<'move' | 'build'>('move');

  const {
    buildService,
    controllers: { game },
    tool,
  } = useEditorContext();

  const players = useAppSelector((state) => state.game.players);
  const currentPlayer = useAppSelector((state) => state.game.currentPlayer);
  const activeBlockType = useAppSelector((state) => state.blockType.addAction?.blockType);

  const currentPlayerIndex = currentPlayer ? players.indexOf(currentPlayer) + 1 : undefined;

  const handleSelect = (blockType: BlockConstantData) => {
    buildService.setBuildBlock(blockType);
  };

  const handleSetActivePanel = (panel: 'move' | 'build') => {
    setActivePanel(panel);
    if (panel === 'move') {
      tool.setSelectedTool(ToolName.Move);
    } else {
      tool.setSelectedTool(ToolName.Add);
    }
  };

  const playerDecorator = useAppSelector(
    (state) => state.block.decorations.players[currentPlayer || ''],
  ) as PlayerDecorator;
  const maxWork = playerDecorator?.maxWork || 0;
  const remaininWork = playerDecorator?.remainingWork || 0;

  return (
    <Dialog
      {...props}
      hasBackdrop={false}
      id={'player-dialog'}
      leftAction={
        <div className="flex flex-row">
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              game.selectNextPlayer();
            }}
            iconName="FaPerson"
            tooltip="Next Player"
          />
          <div className="divider divider-horizontal" />
          <div className="flex flex-row gap-2">
            <ToggleButton tooltip="Move" toggle={activePanel === 'move'} onToggle={() => handleSetActivePanel('move')}>
              <Icon name="BiMove" />
            </ToggleButton>
            <ToggleButton
              tooltip="Build"
              toggle={activePanel === 'build'}
              onToggle={() => handleSetActivePanel('build')}
            >
              <Icon name="BiBuildingHouse" />
            </ToggleButton>
          </div>
        </div>
      }
      placement="modal-bottom"
      rightAction={
        <IconButton iconName="BiSolidSkipNextCircle" onClick={() => game.nextRound()} tooltip="Next round" />
      }
      size="md"
      title={`Player ${currentPlayerIndex}/${players?.length}`}
    >
      <div className="flex items-end flex-row justify-between">
        <div className="flex flex-col gap-1">
          {Array.from({ length: maxWork }).map((_, i) => (
            <div className={`w-4 h-4 ${i >= remaininWork ? 'bg-gray-300' : 'bg-amber-500'} border-2`} key={i} />
          ))}
        </div>
        <div className="divider divider-horizontal" />
        <div className="flex-1">
          {activePanel === 'move' && <MovePanel />}
          {activePanel === 'build' && <BuildPanel onSelect={handleSelect} selectedBlockType={activeBlockType} />}
        </div>
      </div>
    </Dialog>
  );
};

export default PlayerDialog;

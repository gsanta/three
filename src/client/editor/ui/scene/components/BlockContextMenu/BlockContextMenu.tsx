import useEditorContext from '@/app/editor/useEditorContext';
import { useAppSelector } from '@/client/common/hooks/hooks';
import { useEffect, useState } from 'react';
import { Vector3 } from 'three';
import { useFloating } from '@floating-ui/react';
import Button from '@/client/common/components/lib/Button';
import JoinElectricSystemsMenuItem from './JoinElectricSystemsMenuItem';
import { BlockContextMenuActionName } from '@/common/model_types/BlockContextMenuAction';
import MeshWrapper from '@/client/editor/models/MeshWrapper';

const actionToComponent: Record<BlockContextMenuActionName, (props: { onClick(): void }) => JSX.Element> = {
  'join-electric-system': JoinElectricSystemsMenuItem,
};

const BlockContextMenu = () => {
  const selectedRootBlockIds = useAppSelector((state) => state.blockCategory.selectedRootBlockIds);
  const currentContextMenuActions = useAppSelector((state) => state.blockCategory.currentContextMenuActions);

  const { blockStore, contextMenuController } = useEditorContext();

  const [isVisible, setVisible] = useState(false);
  const [pos, setPos] = useState<Vector3>(new Vector3(0, 0, 0));
  const [blockId, setBlockId] = useState<string>();

  const { eraser, sceneStore, sceneService } = useEditorContext();

  useEffect(() => {
    if (selectedRootBlockIds.length) {
      const selectedBlockId = selectedRootBlockIds[0];
      const block = blockStore.getBlock(selectedBlockId);

      if (block.category === 'humans') {
        setVisible(false);
        return;
      }

      setBlockId(selectedBlockId);
      try {
        let obj = sceneStore.getObj3d(selectedBlockId || '');

        if (block.partDetails.ContextMenuAnchor) {
          obj = new MeshWrapper(obj).findByNameOld('ContextMenuAnchor');
        }
        setPos(sceneService.worldToScreen(obj));
        setVisible(true);
      } catch {}
    } else {
      setVisible(false);
    }
  }, [blockStore, sceneService, sceneStore, selectedRootBlockIds]);

  const { refs, floatingStyles } = useFloating({
    placement: 'top',
  });

  const handleDeleteSelectedBlock = () => {
    eraser.erase(selectedRootBlockIds[0]);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div
        className="absolute w-px h-px bg-transparent"
        ref={refs.setReference}
        style={{ top: `${pos.y}px`, left: `${pos.x}px` }}
      />
      <div className="absolute bg-base-100 w-96 p-24 shadow-sm" ref={refs.setFloating} style={floatingStyles}>
        <Button onClick={handleDeleteSelectedBlock}>Delete</Button>
        {currentContextMenuActions.map((action) => {
          const Component = actionToComponent[action.name];

          return Component({ onClick: () => blockId && contextMenuController.execute(action.name, blockId) });
        })}
      </div>
    </>
  );
};

export default BlockContextMenu;

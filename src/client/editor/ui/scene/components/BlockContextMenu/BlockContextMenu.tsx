import useEditorContext from '@/app/editor/useEditorContext';
import { useAppSelector } from '@/client/common/hooks/hooks';
import { useEffect, useState } from 'react';
import { Vector3 } from 'three';
import { useFloating } from '@floating-ui/react';
import Button from '@/client/common/components/lib/Button';
import JoinElectricSystemsMenuItem from './JoinElectricSystemsMenuItem';
import { BlockContextMenuActionName } from '@/common/model_types/BlockContextMenuAction';

const actionToComponent: Record<BlockContextMenuActionName, () => JSX.Element> = {
  'join-electric-system': JoinElectricSystemsMenuItem,
};

const BlockContextMenu = () => {
  const selectedRootBlockIds = useAppSelector((state) => state.blockCategory.selectedRootBlockIds);
  const currentContextMenuActions = useAppSelector((state) => state.blockCategory.currentContextMenuActions);

  const [isVisible, setVisible] = useState(false);
  const [pos, setPos] = useState<Vector3>();

  const { eraser, sceneStore, sceneService } = useEditorContext();

  useEffect(() => {
    if (selectedRootBlockIds.length) {
      const blockId = selectedRootBlockIds[0];
      try {
        const obj = sceneStore.getObj3d(blockId || '');
        setPos(sceneService.worldToScreen(obj));
        setVisible(true);
      } catch {}
    } else {
      setVisible(false);
    }
  }, [sceneService, sceneStore, selectedRootBlockIds]);

  const { refs, floatingStyles } = useFloating();

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
        style={{ top: `${pos?.y}px`, left: `${pos?.x}px` }}
      />
      <div className="absolute card bg-base-100 w-96 p-24 shadow-sm" ref={refs.setFloating} style={floatingStyles}>
        <Button onClick={handleDeleteSelectedBlock}>Delete</Button>
        {currentContextMenuActions.map((action) => {
          const Component = actionToComponent[action.name];

          return Component();
        })}
      </div>
    </>
  );
};

export default BlockContextMenu;

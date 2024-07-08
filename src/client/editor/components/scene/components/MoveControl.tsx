import { snapTo } from '@/client/editor/utils/vectorUtils';
import { PivotControls } from '@react-three/drei';
import { Quaternion, Vector3 } from 'three';
import useEditorContext from '@/app/editor/EditorContext';
import { useAppSelector } from '@/client/common/hooks/hooks';
import { ThreeEvent } from '@react-three/fiber';
import SelectedMeshRenderer from './SelectedMeshRenderer';
import Num3 from '@/client/editor/types/Num3';
import { ReactNode } from 'react';

type MoveControlProps = {
  onPointerDown?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerEnter?: (event: ThreeEvent<PointerEvent>) => void;
  children(props: { drag: Num3 }): ReactNode;
};

const MoveControl = ({ children, onPointerDown, onPointerEnter }: MoveControlProps) => {
  // const selectedBlocks = useSelectedBlocks();

  const blockIds = useAppSelector((store) => store.block.present.blockIds);

  const drag = useAppSelector((selector) => selector.tool.select.drag);
  const moveAxis = useAppSelector((selector) => selector.tool.select.moveAxis);

  const { tool } = useEditorContext();

  // if (!movableBlocks.length) {
  //   return null;
  // }

  return (
    <PivotControls
      depthTest={false}
      activeAxes={moveAxis}
      disableRotations={true}
      rotation={[0, 0, 0]}
      scale={1}
      anchor={[0, 1.5, 0]}
      autoTransform={false}
      onDrag={(_l, d) => {
        const newTransform = new Vector3();
        d.decompose(newTransform, new Quaternion(), new Vector3());
        newTransform.x = snapTo(newTransform.x);
        newTransform.y = snapTo(newTransform.y);
        newTransform.z = snapTo(newTransform.z);
        tool.onDrag(newTransform);
      }}
      onDragEnd={() => {
        tool.onDragEnd();
      }}
      userData={{ role: 'selection-pivot' }}
    >
      <group name="selection-group">
        {children({ drag })}
        {/* {blockIds.map((id) => (
          <SelectedMeshRenderer
            additions={{
              position: drag,
            }}
            key={id}
            blockId={id}
            meshProps={{
              onPointerDown,
              onPointerEnter,
            }}
            materialProps={{ opacity: 0.5, transparent: true }}
          />
        ))} */}
      </group>
    </PivotControls>
  );
};

export default MoveControl;

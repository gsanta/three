import { snapTo } from '@/client/editor/utils/vectorUtils';
import { PivotControls } from '@react-three/drei';
import { Mesh, Quaternion, Vector3 } from 'three';
import { useEffect, useRef, useState } from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import { useAppSelector } from '@/client/common/hooks/hooks';
import Num3 from '@/client/editor/types/Num3';
import { ThreeEvent } from '@react-three/fiber';
import SelectedMeshRenderer from './SelectedMeshRenderer';

type MoveControlProps = {
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void;
  onPointerEnter: (event: ThreeEvent<PointerEvent>) => void;
};

const MoveControl = ({ onPointerDown, onPointerEnter }: MoveControlProps) => {
  // const selectedBlocks = useSelectedBlocks();

  const blockIds = useAppSelector((store) => store.block.present.blockIds);

  const drag = useAppSelector((selector) => selector.tool.select.drag);
  const moveAxis = useAppSelector((selector) => selector.tool.select.moveAxis);

  const [transform, setTransform] = useState<Num3>([0, 0, 0]);
  const selectedMeshRef = useRef<Mesh>(null);
  const { tool } = useEditorContext();

  useEffect(() => {
    tool.setSelectedMesh(selectedMeshRef.current || undefined);
  }, [tool]);

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
        setTransform(newTransform.toArray());
        tool.onDrag(newTransform);
      }}
      onDragEnd={() => {
        tool.onDragEnd();
        setTransform([0, 0, 0]);
      }}
      userData={{ role: 'selection-pivot' }}
    >
      <group name="selection-group">
        {blockIds.map((id) => (
          <SelectedMeshRenderer
            additions={{
              position: drag,
            }}
            key={id}
            blockId={id}
            meshProps={{
              ref: selectedMeshRef,
              onPointerDown,
              onPointerEnter,
            }}
            transform={transform}
            materialProps={{ opacity: 0.5, transparent: true }}
          />
        ))}
        {/* {Object.keys(selectedBlocks)
          .filter((block) => !block.parent)
          .map((block) => (
            <MeshRenderer
              additions={{
                position: drag,
              }}
              block={block}
              key={block.id}
              meshProps={{
                ref: selectedMeshRef,
                position: addVector(block.position, transform),
                onPointerDown,
                onPointerEnter,
              }}
              materialProps={{ color: 'pink', opacity: 0.5, transparent: true }}
            />
          ))} */}
      </group>
    </PivotControls>
  );
};

export default MoveControl;

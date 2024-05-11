import { snapTo, addVector } from '@/client/editor/utils/vectorUtils';
import { PivotControls } from '@react-three/drei';
import { Mesh, Quaternion, Vector3 } from 'three';
import { useEffect, useRef, useState } from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import useSelectedBlocks from '@/client/editor/components/hooks/useSelectedBlocks';
import { useAppSelector } from '@/client/common/hooks/hooks';
import Num3 from '@/client/editor/types/Num3';
import MeshRenderer from './MeshRenderer';
import BlockUtils from '@/client/editor/utils/BlockUtils';

const MoveControl = () => {
  const selectedBlocks = useSelectedBlocks();
  const movableBlocks = selectedBlocks.filter((mesh) => mesh.movable);

  const templates = useAppSelector((selector) => selector.template.present.blocks);
  const { selectedPartNames } = useAppSelector((selector) => selector.block.present);
  const { drag, moveAxis } = useAppSelector((selector) => selector.tool.select);

  const [transform, setTransform] = useState<Num3>([0, 0, 0]);
  const selectedMeshRef = useRef<Mesh>(null);
  const { tool } = useEditorContext();

  useEffect(() => {
    tool.setSelectedMesh(selectedMeshRef.current || undefined);
  }, [tool]);

  if (!movableBlocks.length) {
    return null;
  }

  return (
    <PivotControls
      depthTest={false}
      activeAxes={moveAxis}
      disableRotations={true}
      rotation={[0, Math.PI / 2, 0]}
      scale={1}
      anchor={[0, 0, 0.4]}
      autoTransform={false}
      onDrag={(_l, d) => {
        const newTransform = new Vector3();
        d.decompose(newTransform, new Quaternion(), new Vector3());
        newTransform.x = snapTo(newTransform.x);
        newTransform.y = snapTo(newTransform.y, BlockUtils.getBlock(templates, selectedBlocks[0].name).snap?.y);
        newTransform.z = snapTo(newTransform.z);
        setTransform(newTransform.toArray());
        tool.onDrag(newTransform);
      }}
      onDragEnd={() => {
        tool.onDragEnd(new Vector3(transform[0], transform[1], transform[2]));
        setTransform([0, 0, 0]);
      }}
      userData={{ role: 'selection-pivot' }}
    >
      <group name="selection-group">
        {movableBlocks.map((block) => (
          <MeshRenderer
            additions={{
              position: drag,
            }}
            block={block}
            key={block.id}
            meshProps={{
              ref: selectedMeshRef,
              position: addVector(block.position, transform),
              onPointerDown: () => {},
            }}
            materialProps={{ color: 'pink', opacity: 0.5, transparent: true }}
            selectedParts={selectedPartNames[block.id]}
          />
        ))}
      </group>
    </PivotControls>
  );
};

export default MoveControl;

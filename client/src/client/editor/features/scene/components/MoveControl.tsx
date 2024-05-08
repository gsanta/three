import { snapTo, addVector } from '@/client/editor/utils/vectorUtils';
import { PivotControls } from '@react-three/drei';
import { Mesh, Quaternion, Vector3 } from 'three';
import { useEffect, useRef, useState } from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import useSelectedBlocks from '@/client/editor/features/block/components/hooks/useSelectedBlocks';
import { getBlock } from '@/client/editor/features/block/utils/blockUtils';
import { useAppSelector } from '@/client/common/hooks/hooks';
import Num3 from '@/client/editor/types/Num3';
import { ModelMesh } from '../../block/components/meshes/ModelMesh';
import Block from '@/client/editor/types/Block';

const MoveControl = () => {
  const selectedBlocks = useSelectedBlocks();
  const movableBlocks = selectedBlocks.filter((mesh) => mesh.movable);

  const templates = useAppSelector((selector) => selector.template.present.blocks);
  const { blocks, selectedPartNames } = useAppSelector((selector) => selector.block.present);

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
      activeAxes={[true, true, true]}
      rotation={[0, Math.PI / 2, 0]}
      scale={1}
      anchor={[0, 0, 0.4]}
      autoTransform={false}
      onDrag={(_l, d) => {
        const newTransform = new Vector3();
        d.decompose(newTransform, new Quaternion(), new Vector3());
        newTransform.x = snapTo(newTransform.x);
        newTransform.y = snapTo(newTransform.y, getBlock(templates, selectedBlocks[0].name).snap?.y);
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
          <ModelMesh
            additions={{
              position: transform,
            }}
            block={block as Block<'model'>}
            key={block.id}
            meshProps={{
              ref: selectedMeshRef,
              position: addVector(block.position, transform),
              onPointerDown: () => {},
            }}
            materialProps={{ color: 'pink', opacity: 0.5, transparent: true }}
            parent={block.parent ? blocks[block.parent] : undefined}
            selectedParts={selectedPartNames[block.id]} // partMaterialProps={partMaterialProps}
          />
          // <MeshRenderer
          //   additions={{
          //     position: transform,
          //   }}
          //   key={meshInfo.id}
          //   block={meshInfo}
          //   meshProps={{
          //     ref: selectedMeshRef,
          //     position: addVector(meshInfo.position, transform),
          //     onPointerDown: () => {},
          //   }}
          //   materialProps={{ color: 'pink', opacity: 0.5, transparent: true }}
          // />
        ))}
      </group>
    </PivotControls>
  );
};

export default MoveControl;

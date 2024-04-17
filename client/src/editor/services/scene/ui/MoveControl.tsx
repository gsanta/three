import { snapTo, addVector } from '@/editor/utils/vectorUtils';
import { PivotControls } from '@react-three/drei';
import { Mesh, Quaternion, Vector3 } from 'three';
import { useEffect, useRef, useState } from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import MeshRenderer from './MeshRenderer';
import useSelectedBlocks from '@/editor/features/block/useSelectedBlocks';
import { getBlock } from '@/editor/features/block/utils/blockUtils';
import { useAppSelector } from '@/common/hooks/hooks';

const MoveControl = () => {
  const selectedMeshes = useSelectedBlocks();

  const movableMeshes = selectedMeshes.filter((mesh) => mesh.movable);

  const blocks = useAppSelector((selector) => selector.blockSettings.present.blocks);
  const [transform, setTransform] = useState<Vector3>(new Vector3(0));
  const selectedMeshRef = useRef<Mesh>(null);
  const { tool } = useEditorContext();

  useEffect(() => {
    tool.setSelectedMesh(selectedMeshRef.current || undefined);
  }, [tool]);

  if (!movableMeshes.length) {
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
        newTransform.y = snapTo(newTransform.y, getBlock(blocks, selectedMeshes[0].name).snap?.y);
        newTransform.z = snapTo(newTransform.z);
        setTransform(newTransform);
        tool.onDrag(newTransform);
      }}
      onDragEnd={() => {
        tool.onDragEnd(transform);
        setTransform(new Vector3(0));
      }}
      userData={{ role: 'selection-pivot' }}
    >
      <group name="selection-group">
        {movableMeshes.map((meshInfo) => (
          <MeshRenderer
            key={meshInfo.id}
            meshInfo={meshInfo}
            meshProps={{
              ref: selectedMeshRef,
              position: addVector(meshInfo.position, transform ? transform.toArray() : [0, 0, 0]),
              onPointerDown: () => {},
            }}
            materialProps={{ color: 'pink', opacity: 0.5, transparent: true }}
          />
        ))}
      </group>
    </PivotControls>
  );
};

export default MoveControl;

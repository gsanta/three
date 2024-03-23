import MeshData from '@/editor/types/MeshData';
import { snapTo, addVector } from '@/editor/utils/vectorUtils';
import { PivotControls } from '@react-three/drei';
import { Mesh, Quaternion, Vector3 } from 'three';
import useBlock from '../../../features/block/ui/hooks/useBlock';
import { useEffect, useRef, useState } from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import MeshRenderer from './MeshRenderer';

type SelectedMeshProps = {
  selectedMeshes: MeshData[];
};

const SelectedMesh = ({ selectedMeshes }: SelectedMeshProps) => {
  const block = useBlock(selectedMeshes[0].name);
  const [transform, setTransform] = useState<Vector3>(new Vector3(0));
  const selectedMeshRef = useRef<Mesh>(null);
  const { tool } = useEditorContext();

  useEffect(() => {
    tool.setSelectedMesh(selectedMeshRef.current || undefined);
  }, [tool]);

  return (
    <PivotControls
      depthTest={false}
      activeAxes={[true, true, true]}
      rotation={[0, Math.PI / 2, 0]}
      scale={1}
      anchor={[0, 0, 0.4]}
      autoTransform={false}
      onDrag={(_l, d) => {
        const position = new Vector3();
        d.decompose(position, new Quaternion(), new Vector3());
        position.x = snapTo(position.x);
        position.y = snapTo(position.y, block?.snap?.y);
        position.z = snapTo(position.z);
        // transformRef.current = position;
        setTransform(position);

        // tool.onDrag(position);
      }}
      onDragEnd={() => {
        tool.onDragEnd(transform);
        setTransform(new Vector3(0));
      }}
      userData={{ role: 'selection-pivot' }}
    >
      <group>
        {selectedMeshes.map((meshInfo) => (
          <MeshRenderer
            key={meshInfo.id}
            meshInfo={meshInfo}
            meshProps={{
              ref: selectedMeshRef,
              position: addVector(meshInfo.position, transform ? transform.toArray() : [0, 0, 0]),
              onPointerDown: () => {},
            }}
            materialProps={{ color: 'pink' }}
          />
        ))}
      </group>
    </PivotControls>
  );
};

export default SelectedMesh;

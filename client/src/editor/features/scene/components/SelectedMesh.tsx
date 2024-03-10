import MeshInfo from '@/editor/types/MeshInfo';
import { snapTo, addVector } from '@/editor/utils/vectorUtils';
import { PivotControls } from '@react-three/drei';
import { Mesh, Quaternion, Vector3 } from 'three';
import useBlock from '../../builder/hooks/useBlock';
import { useEffect, useRef, useState } from 'react';
import useEditorContext from '@/app/editor/EditorContext';
import MeshRenderer from './MeshRenderer';

type SelectedMeshProps = {
  selectedMesh: MeshInfo;
};

const SelectedMesh = ({ selectedMesh }: SelectedMeshProps) => {
  const block = useBlock(selectedMesh.name);
  const [transform, setTransform] = useState<Vector3>(new Vector3(0));
  const selectedMeshRef = useRef<Mesh>(null);
  const { tool } = useEditorContext();

  useEffect(() => {
    tool.setSelectedMesh(selectedMeshRef.current || undefined);
  }, [tool]);

  return (
    <PivotControls
      depthTest={false}
      key={selectedMesh.id}
      activeAxes={[true, true, true]}
      rotation={[0, Math.PI / 2, 0]}
      scale={1}
      anchor={[0, 0, 0.4]}
      autoTransform={false}
      onDrag={(_l, d) => {
        console.log('drag');
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
    >
      <MeshRenderer
        meshInfo={selectedMesh}
        meshProps={{
          ref: selectedMeshRef,
          position: addVector(selectedMesh.position, transform ? transform.toArray() : [0, 0, 0]),
          onPointerDown: () => {},
        }}
      />
    </PivotControls>
  );
};

export default SelectedMesh;

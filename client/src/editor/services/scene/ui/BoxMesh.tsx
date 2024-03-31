import { addVector } from '@/editor/utils/vectorUtils';
import WrappedMeshProps from '../types/WrappedMeshProps';
import useEditorContext from '@/app/editor/EditorContext';
import { useEffect, useRef } from 'react';
import { Mesh } from 'three';

const BoxMesh = ({ meshInfo, meshProps, materialProps, parent }: WrappedMeshProps) => {
  const { scene } = useEditorContext();

  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    const id = meshRef.current?.userData.modelId;
    scene.addMesh(meshRef.current);

    return () => {
      scene.removeMesh(id);
    };
  }, [scene]);

  return (
    <mesh
      onPointerDown={meshProps?.onPointerDown}
      castShadow
      position={addVector(meshInfo.position, parent?.position || [0, 0, 0])}
      rotation={meshInfo.rotation}
      scale={meshInfo.scale}
      {...meshProps}
      key={meshInfo.id}
      name={meshInfo.name}
      ref={meshRef}
      userData={{ modelId: meshInfo.id }}
    >
      <boxGeometry key="geometry" />
      <meshStandardMaterial key="material" color="red" {...materialProps} />
    </mesh>
  );
};

export default BoxMesh;

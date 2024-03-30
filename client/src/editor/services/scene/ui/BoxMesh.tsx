import { addVector } from '@/editor/utils/vectorUtils';
import MeshRendererProps from '../types/MeshRendererProps';
import useEditorContext from '@/app/editor/EditorContext';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/common/hooks/hooks';
import { Mesh } from 'three';

const BoxMesh = ({ meshInfo, meshProps, materialProps }: MeshRendererProps) => {
  const { scene, tool } = useEditorContext();
  const { meshes } = useAppSelector((selector) => selector.scene.present);

  const parent = meshInfo.parent ? meshes[meshInfo.parent] : undefined;

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
      onPointerDown={(e) => {
        tool.onPointerDown(e);
        e.stopPropagation();
      }}
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

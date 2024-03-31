import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import useEditorContext from '@/app/editor/EditorContext';
import { BufferGeometry, Mesh, NormalBufferAttributes } from 'three';
import WrappedMeshProps from '../types/WrappedMeshProps';

type ModelMeshProps = WrappedMeshProps<'model'>;

type NodesType = {
  [name: string]: BufferGeometry<NormalBufferAttributes> | NodesType;
};

type NodesOrObject3DType = NodesType | BufferGeometry<NormalBufferAttributes>;

export const ModelMesh = ({ meshInfo, meshProps }: ModelMeshProps) => {
  const { nodes, materials } = useGLTF(meshInfo.path);

  const { scene } = useEditorContext();

  const meshRef = useRef<Mesh>(null);

  const geometryNodes = nodes as unknown as NodesType;

  useEffect(() => {
    const id = meshRef.current?.userData.modelId;
    scene.addMesh(meshRef.current);

    return () => {
      scene.removeMesh(id);
    };
  }, [scene]);

  return (
    <group
      position={meshInfo.position}
      scale={meshInfo.scale}
      {...meshProps}
      ref={meshRef}
      userData={{ modelId: meshInfo.id }}
    >
      {meshInfo.parts.map((part) => {
        const geometryPaths = part.geometryPath.split('.');

        const geometry = geometryPaths.reduce(
          (prev: NodesOrObject3DType, curr: string) => (prev as NodesType)[curr] as NodesOrObject3DType,
          geometryNodes,
        ) as BufferGeometry<NormalBufferAttributes>;

        return <mesh castShadow receiveShadow geometry={geometry} material={materials[part.materialPath]} />;
      })}
    </group>
  );
};

useGLTF.preload('/tree.glb');

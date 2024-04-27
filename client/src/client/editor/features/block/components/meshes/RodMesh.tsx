import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import WrappedMeshProps from '../../types/WrappedMeshProps';
import useEditorContext from '@/app/editor/EditorContext';
import { Mesh } from 'three';

export const RodMesh = ({ meshInfo, meshProps, materialProps, parent }: WrappedMeshProps) => {
  const { nodes, materials } = useGLTF('/untitled.glb');

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
      castShadow
      receiveShadow
      geometry={nodes.Cube.geometry}
      scale={[2, 0.5, 0.5]}
      userData={{ modelId: meshInfo.id }}
      position={meshInfo.position}
      {...meshProps}
      ref={meshRef}
    >
      <meshStandardMaterial {...materials.Material} color="red" {...materialProps} />
    </mesh>
  );
};

useGLTF.preload('/untitled.glb');

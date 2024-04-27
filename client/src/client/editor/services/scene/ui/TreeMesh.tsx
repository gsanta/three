import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import useEditorContext from '@/app/editor/EditorContext';
import { Mesh } from 'three';
import WrappedMeshProps from '../types/WrappedMeshProps';

export const TreeMesh = ({ meshInfo, meshProps, materialProps, parent }: WrappedMeshProps) => {
  const { nodes, materials } = useGLTF('/tree.glb');

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
    <group
      position={meshInfo.position}
      scale={[0.572, 4.28, 0.572]}
      {...meshProps}
      ref={meshRef}
      userData={{ modelId: meshInfo.id }}
    >
      <mesh castShadow receiveShadow geometry={nodes.Cylinder_1.geometry} material={materials['Material.002']} />
      <mesh castShadow receiveShadow geometry={nodes.Cylinder_2.geometry} material={materials['Material.004']} />
      <mesh castShadow receiveShadow geometry={nodes.Cylinder_3.geometry} material={materials['Material.003']} />
      <mesh castShadow receiveShadow geometry={nodes.Cylinder_4.geometry} material={materials['Material.001']} />
    </group>
  );
};

useGLTF.preload('/tree.glb');

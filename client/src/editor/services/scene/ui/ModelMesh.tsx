import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import useEditorContext from '@/app/editor/EditorContext';
import { BufferGeometry, Material, Mesh, NormalBufferAttributes } from 'three';
import WrappedMeshProps from '../types/WrappedMeshProps';
import { ModelPart } from '@/editor/types/BlockData';

type ModelMeshProps = WrappedMeshProps<'model'>;

type NodesType = {
  [name: string]: BufferGeometry<NormalBufferAttributes> | NodesType;
};

type NodesOrObject3DType = NodesType | BufferGeometry<NormalBufferAttributes>;

type ModelPartProps = {
  materials: {
    [name: string]: Material;
  };
  nodes: NodesType;
  part: ModelPart;
};

const ModelMeshPart = ({ materials, nodes, part }: ModelPartProps) => {
  const geometryPaths = part.geometryPath?.split('.') || [];

  const materialPaths = part.materialPath?.split('.') || [];

  let material: Material;

  if (materialPaths[0] === 'nodes') {
    materialPaths.shift();

    material = materialPaths.reduce(
      (prev: NodesOrObject3DType, curr: string) => (prev as NodesType)[curr] as NodesOrObject3DType,
      nodes,
    ) as unknown as Material;
  } else {
    material = materials[materialPaths[0]];
  }

  const geometry = geometryPaths.reduce(
    (prev: NodesOrObject3DType, curr: string) => (prev as NodesType)[curr] as NodesOrObject3DType,
    nodes,
  ) as BufferGeometry<NormalBufferAttributes>;

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={geometry}
      material={material}
      position={part.position}
      rotation={part.rotation}
      scale={part.scale}
      name={part.name || ''}
    />
  );
};

const ModelGroupPart = ({ part, ...rest }: ModelPartProps) => {
  return (
    <group position={part.position} rotation={part.rotation} scale={part.scale} name={part.name || ''}>
      {part.parts.map((childPart) =>
        childPart.parts ? <ModelGroupPart {...rest} part={childPart} /> : <ModelMeshPart {...rest} part={childPart} />,
      )}
    </group>
  );
};

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
      rotation={meshInfo.rotation}
      scale={meshInfo.scale}
      {...meshProps}
      ref={meshRef}
      userData={{ modelId: meshInfo.id }}
    >
      {meshInfo.parts.map((childPart) =>
        childPart.parts ? (
          <ModelGroupPart materials={materials} nodes={geometryNodes} part={childPart} />
        ) : (
          <ModelMeshPart materials={materials} nodes={geometryNodes} part={childPart} />
        ),
      )}
    </group>
  );
};

useGLTF.preload('/tree.glb');

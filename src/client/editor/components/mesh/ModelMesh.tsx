import { useGLTF } from '@react-three/drei';
import { BufferGeometry, Material, MeshStandardMaterial, NormalBufferAttributes } from 'three';
import WrappedMeshProps from '../../types/block/WrappedMeshProps';
import { ModelPart } from '@/client/editor/types/BlockType';
import useRegisterScene from '../hooks/useRegisterScene';
import { GroupProps } from '@react-three/fiber';
import { addVector } from '@/client/editor/utils/vectorUtils';

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
  selectedParts: ModelMeshProps['selectedParts'];
};

const ModelMeshPart = ({ materials, nodes, part, selectedParts }: ModelPartProps) => {
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

  const color = selectedParts.includes(part?.name || '') ? 'green' : undefined;

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={geometry}
      material={color ? new MeshStandardMaterial({ color: 'green' }) : material}
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

export const ModelMesh = ({ additions, block, meshProps, selectedParts = [] }: ModelMeshProps) => {
  const ref = useRegisterScene();
  const position = additions?.position ? addVector(additions.position, block.position) : block.position;

  const { nodes, materials } = useGLTF(block.path);

  const geometryNodes = nodes as unknown as NodesType;

  return (
    <group
      rotation={block.rotation}
      scale={block.scale}
      {...(meshProps as GroupProps)}
      position={position}
      ref={ref}
      userData={{ modelId: block.id }}
    >
      {block.parts.map((childPart) =>
        childPart.parts ? (
          <ModelGroupPart
            key={childPart.name}
            materials={materials}
            nodes={geometryNodes}
            part={childPart}
            selectedParts={selectedParts}
          />
        ) : (
          <ModelMeshPart
            key={childPart.name}
            materials={materials}
            nodes={geometryNodes}
            part={childPart}
            selectedParts={selectedParts}
          />
        ),
      )}
    </group>
  );
};

useGLTF.preload('/tree.glb');

import { useGLTF } from '@react-three/drei';
import { BufferGeometry, Material, MeshStandardMaterial, NormalBufferAttributes } from 'three';
import WrappedMeshProps from '../../types/block/WrappedMeshProps';
import { ModelPart } from '@/client/editor/types/BlockType';
import useRegisterScene from '../hooks/useRegisterScene';
import { GroupProps, ThreeEvent } from '@react-three/fiber';
import { addVector } from '@/client/editor/utils/vectorUtils';
import Block from '../../types/Block';

type ModelMeshProps = WrappedMeshProps<'model'>;

type NodesType = {
  [name: string]: BufferGeometry<NormalBufferAttributes> | NodesType;
};

type NodesOrObject3DType = NodesType | BufferGeometry<NormalBufferAttributes>;

type ModelPartProps = {
  block: Block;
  materials: {
    [name: string]: Material;
  };
  nodes: NodesType;
  onPointerEnter?: (event: ThreeEvent<PointerEvent>, partIndex?: string) => void;
  part: ModelPart;
  selectedParts: ModelMeshProps['selectedParts'];
};

const ModelMeshPart = ({ block, materials, nodes, onPointerEnter, part, selectedParts }: ModelPartProps) => {
  const color = selectedParts.includes(part.index) ? 'green' : undefined;

  if (block.partDetails[part.index]?.isHidden) {
    return null;
  }

  if (!block.isHovered && !block.isSelected && block.partDetails[part.index]?.role === 'slot' && !color) {
    return null;
  }

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
      material={color ? new MeshStandardMaterial({ color: 'green' }) : material}
      onPointerEnter={onPointerEnter ? (e) => onPointerEnter(e, part.index) : undefined}
      position={part.position}
      rotation={part.rotation}
      scale={part.scale}
      name={part.index || ''}
      userData={{ modelId: block.id }}
    />
  );
};

const ModelGroupPart = ({ part, block, ...rest }: ModelPartProps) => {
  if (block.partDetails[part.index]?.isHidden) {
    return null;
  }

  return (
    <group position={part.position} rotation={part.rotation} scale={part.scale} name={part.name || ''}>
      {part.parts.map((childPart) =>
        childPart.parts ? (
          <ModelGroupPart {...rest} block={block} part={childPart} />
        ) : (
          <ModelMeshPart {...rest} block={block} part={childPart} />
        ),
      )}
    </group>
  );
};

export const ModelMesh = ({ additions, block, meshProps, overwrites, selectedParts = [] }: ModelMeshProps) => {
  const ref = useRegisterScene();
  const blockPosition = overwrites?.position ? overwrites.position : block.position;
  const position = additions?.position ? addVector(additions.position, blockPosition) : blockPosition;
  const blockRotation = overwrites?.rotation ? overwrites.rotation : block.rotation;

  const { nodes, materials } = useGLTF(block.path);

  const geometryNodes = nodes as unknown as NodesType;

  return (
    <group
      rotation={blockRotation}
      scale={block.scale}
      {...(meshProps as GroupProps)}
      position={position}
      ref={ref}
      userData={{ modelId: block.id }}
    >
      {block.parts.map((childPart) =>
        childPart.parts ? (
          <ModelGroupPart
            block={block}
            key={childPart.name}
            materials={materials}
            nodes={geometryNodes}
            part={childPart}
            selectedParts={selectedParts}
          />
        ) : (
          <ModelMeshPart
            block={block}
            key={childPart.name}
            materials={materials}
            nodes={geometryNodes}
            onPointerEnter={meshProps?.onPointerEnter}
            part={childPart}
            selectedParts={selectedParts}
          />
        ),
      )}
    </group>
  );
};

useGLTF.preload('/tree.glb');

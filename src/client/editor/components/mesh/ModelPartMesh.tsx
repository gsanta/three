import { ThreeEvent } from '@react-three/fiber';
import { Material, MeshStandardMaterial } from 'three';
import { ModelPart } from '../../types/BlockType';
import useGeometry, { NodesType } from '../hooks/useGeometry';
import useMaterial from '../hooks/useMaterial';
import ModelMeshProps from '../types/ModelMeshProps';
import Block from '../../types/Block';

export type ModelPartProps = {
  block: Block;
  materials: {
    [name: string]: Material;
  };
  nodes: NodesType;
  onPointerEnter?: (event: ThreeEvent<PointerEvent>, partIndex?: string) => void;
  part: ModelPart;
  selectedParts: ModelMeshProps['selectedParts'];
};

const ModelPartMesh = ({ block, materials, nodes, onPointerEnter, part }: ModelPartProps) => {
  const color = block.partDetails[part.index]?.isSelected ? 'green' : undefined;

  const material = useMaterial({ block, materials, nodes, part });
  const geometry = useGeometry(nodes, part);

  if (block.partDetails[part.index]?.isHidden) {
    return null;
  }

  if (!block.isSelected && !block.isHovered && block.partDetails[part.index]?.category === 'placeholder') {
    return null;
  }

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

export default ModelPartMesh;

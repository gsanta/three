import { MeshStandardMaterialProps, ThreeEvent } from '@react-three/fiber';
import { Material, MeshStandardMaterial } from 'three';
import { ModelPart } from '../../types/BlockType';
import useGeometry, { NodesType } from '../hooks/useGeometry';
import useMaterial from '../hooks/useMaterial';
import Block from '../../types/Block';

export type ModelPartProps = {
  block: Block;
  materials: {
    [name: string]: Material;
  };
  materialProps?: MeshStandardMaterialProps;
  nodes: NodesType;
  onPointerEnter?: (event: ThreeEvent<PointerEvent>, partIndex?: string) => void;
  part: ModelPart;
};

const ModelPartMesh = ({ block, materials, materialProps, nodes, onPointerEnter, part }: ModelPartProps) => {
  const partInfo = block.partDetails[part.index];
  const color = block.partDetails[part.index]?.isSelected ? 'green' : undefined;

  const material = useMaterial({ materials, materialProps, nodes, part });
  const geometry = useGeometry(nodes, part);

  if (block.partDetails[part.index]?.isHidden) {
    return null;
  }

  if (!block.isSelected && !block.isHovered && block.partDetails[part.index]?.type === 'placeholder') {
    return null;
  }

  return (
    <mesh
      castShadow
      key={`${block.id}-${part.index}`}
      receiveShadow
      geometry={geometry}
      material={color ? new MeshStandardMaterial({ color: 'green' }) : material}
      onPointerEnter={onPointerEnter ? (e) => onPointerEnter(e, part.index) : undefined}
      position={part.position}
      rotation={part.rotation}
      scale={part.scale}
      name={partInfo?.name || ''}
      userData={{ modelId: block.id }}
    />
  );
};

export default ModelPartMesh;

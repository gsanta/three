import { MeshStandardMaterialProps, ThreeEvent } from '@react-three/fiber';
import { Material } from 'three';
import { ModelPart } from '../../types/BlockType';
import useGeometry, { NodesType } from '../hooks/useGeometry';
import useMaterial from '../hooks/useMaterial';
import Block from '../../types/Block';
import { Select } from '@react-three/postprocessing';

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

  const material = useMaterial({ materials, materialProps, nodes, part, isSelected: block.isSelected });
  const geometry = useGeometry(nodes, part);

  return (
    <Select
      enabled={(block.isHovered && part.index === block.hoveredPart) || (block.isSelected && partInfo?.isSelected)}
    >
      <mesh
        castShadow
        key={`${block.id}-${part.index}`}
        receiveShadow
        geometry={geometry}
        material={material}
        visible={!block.partDetails[part.index]?.hide}
        onPointerEnter={onPointerEnter ? (e) => onPointerEnter(e, part.index) : undefined}
        position={part.position}
        rotation={part.rotation}
        scale={part.scale}
        name={partInfo?.name || ''}
        userData={{ modelId: block.id }}
      />
    </Select>
  );
};

export default ModelPartMesh;

import { MeshStandardMaterialProps, ThreeEvent } from '@react-three/fiber';
import { Material } from 'three';
import useGeometry, { NodesType } from '../hooks/useGeometry';
import useMaterial from '../hooks/useMaterial';
import BlockData from '../../data/BlockData';
import { Select } from '@react-three/postprocessing';
import BlockPartGeometryData from '../../data/BlockPartGeometryData';

export type ModelPartProps = {
  block: BlockData;
  materials: {
    [name: string]: Material;
  };
  materialProps?: MeshStandardMaterialProps;
  nodes: NodesType;
  onPointerEnter?: (event: ThreeEvent<PointerEvent>, partIndex?: string) => void;
  part: BlockPartGeometryData;
};

const ModelPartMesh = ({ block, materials, materialProps, nodes, onPointerEnter, part }: ModelPartProps) => {
  const partInfo = block.partDetails[part.name];

  const material = useMaterial({ materials, materialProps, nodes, part, isSelected: block.isSelected });
  const geometry = useGeometry(nodes, part, block);

  return (
    <Select
      enabled={(block.isHovered && part.name === block.hoveredPart) || (block.isSelected && partInfo?.isSelected)}
    >
      <mesh
        castShadow
        key={`${block.id}-${part.name}`}
        receiveShadow
        geometry={geometry}
        material={material}
        visible={!block.partDetails[part.name]?.hide}
        onPointerEnter={onPointerEnter ? (e) => onPointerEnter(e, part.name) : undefined}
        position={part.position}
        rotation={part.rotation}
        scale={part.scale}
        name={part.name || ''}
        userData={{ modelId: block.id }}
      />
    </Select>
  );
};

export default ModelPartMesh;

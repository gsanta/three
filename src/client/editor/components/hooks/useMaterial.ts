import { BufferGeometry, Material, NormalBufferAttributes } from 'three';
import { ModelPart } from '../../types/BlockType';
import { NodesType } from './useGeometry';
import Block from '../../types/Block';
import { useMemo, useRef } from 'react';

export type NodesOrObject3DType = NodesType | BufferGeometry<NormalBufferAttributes>;

type UseMaterialProps = {
  block: Block;
  materials: {
    [name: string]: Material;
  };
  nodes: NodesType;
  part: ModelPart;
};

const getMaterial = (materials: UseMaterialProps['materials'], nodes: NodesType, part: ModelPart) => {
  let material: Material;

  const materialPaths = part.materialPath?.split('.') || [];

  if (materialPaths[0] === 'nodes') {
    materialPaths.shift();

    material = materialPaths.reduce(
      (prev: NodesOrObject3DType, curr: string) => (prev as NodesType)[curr] as NodesOrObject3DType,
      nodes,
    ) as unknown as Material;
  } else {
    material = materials[materialPaths[0]];
  }

  return material;
};

const useMaterial = ({ block, materials, nodes, part }: UseMaterialProps) => {
  const selectionMaterial = useRef<Material>();

  let material: Material | undefined = undefined;

  material = useMemo(() => {
    if (block.isSelected) {
      selectionMaterial.current = (material || getMaterial(materials, nodes, part)).clone();
      selectionMaterial.current.transparent = true;
      selectionMaterial.current.opacity = 0.2;

      return selectionMaterial.current;
    } else {
      if (selectionMaterial.current) {
        selectionMaterial.current.dispose();
      }
      return getMaterial(materials, nodes, part);
    }
  }, [block.isSelected, material, materials, nodes, part]);

  return material;
};

export default useMaterial;

import { BufferGeometry, Material, NormalBufferAttributes } from 'three';
import { ModelPart } from '../../models/BlockType';
import { NodesType } from './useGeometry';
import { useMemo, useRef } from 'react';
import { MeshStandardMaterialProps } from '@react-three/fiber';

export type NodesOrObject3DType = NodesType | BufferGeometry<NormalBufferAttributes>;

type UseMaterialProps = {
  isSelected: boolean;
  materials: {
    [name: string]: Material;
  };
  materialProps?: MeshStandardMaterialProps;
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

const useMaterial = ({ isSelected, materialProps, materials, nodes, part }: UseMaterialProps) => {
  const selectionMaterial = useRef<Material>();

  let material: Material | undefined = undefined;

  material = useMemo(() => {
    if (materialProps) {
      const newMaterial = (material || getMaterial(materials, nodes, part)).clone();

      for (const key in materialProps) {
        if (materialProps.hasOwnProperty(key)) {
          (newMaterial[key as keyof Omit<Material, 'isMaterial'>] as unknown) = materialProps[key as keyof Material];
        }
      }

      selectionMaterial.current = newMaterial;

      // Object.keys(materialProps).forEach((prop) => {
      //   newMaterial[prop as Exclude<keyof Material, 'isMaterial'>] = materialProps[prop];
      // });

      if (isSelected) {
        selectionMaterial.current.transparent = true;
        selectionMaterial.current.opacity = 0.2;
      }

      return selectionMaterial.current;
    } else {
      if (selectionMaterial.current) {
        selectionMaterial.current.dispose();
      }
      return getMaterial(materials, nodes, part);
    }
  }, [isSelected, material, materialProps, materials, nodes, part]);

  return material;
};

export default useMaterial;

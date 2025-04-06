import { BufferGeometry, NormalBufferAttributes } from 'three';
import { ModelPart } from '../../types/BlockType';
import { NodesOrObject3DType } from './useMaterial';
import { useMemo } from 'react';

export type NodesType = {
  [name: string]: BufferGeometry<NormalBufferAttributes> | NodesType;
};

const useGeometry = (nodes: NodesType, part: ModelPart) => {
  const geometryPath = useMemo(() => part.name + '.geometry', [part.name]);
  const geometryPathParts = geometryPath?.split('.');

  const geometry = geometryPathParts.reduce(
    (prev: NodesOrObject3DType, curr: string) => (prev as NodesType)[curr] as NodesOrObject3DType,
    nodes,
  ) as BufferGeometry<NormalBufferAttributes>;

  return geometry;
};

export default useGeometry;

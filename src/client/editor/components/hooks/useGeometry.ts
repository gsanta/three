import { BufferGeometry, NormalBufferAttributes } from 'three';
import { ModelPart } from '../../types/BlockType';
import { NodesOrObject3DType } from './useMaterial';
import { useMemo } from 'react';
import Block from '../../types/Block';
import camelCase from 'camelcase';

export type NodesType = {
  [name: string]: BufferGeometry<NormalBufferAttributes> | NodesType;
};

const useGeometry = (nodes: NodesType, part: ModelPart, block: Block) => {
  const geometryPath = useMemo(() => {
    const camelized = camelCase(block.type);

    return `${camelized[0].toUpperCase()}${camelized.slice(1)}${part.name}.geometry`;
  }, [block.type, part.name]);
  const geometryPathParts = geometryPath?.split('.');

  const geometry = geometryPathParts.reduce(
    (prev: NodesOrObject3DType, curr: string) => (prev as NodesType)[curr] as NodesOrObject3DType,
    nodes,
  ) as BufferGeometry<NormalBufferAttributes>;

  return geometry;
};

export default useGeometry;

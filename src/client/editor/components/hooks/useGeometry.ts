import { BufferGeometry, NormalBufferAttributes } from 'three';
import { ModelPart } from '../../types/BlockType';
import { NodesOrObject3DType } from './useMaterial';

export type NodesType = {
  [name: string]: BufferGeometry<NormalBufferAttributes> | NodesType;
};

const useGeometry = (nodes: NodesType, part: ModelPart) => {
  const geometryPaths = part.geometryPath?.split('.') || [];

  const geometry = geometryPaths.reduce(
    (prev: NodesOrObject3DType, curr: string) => (prev as NodesType)[curr] as NodesOrObject3DType,
    nodes,
  ) as BufferGeometry<NormalBufferAttributes>;

  return geometry;
};

export default useGeometry;

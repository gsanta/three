import Num3 from '../../math/Num3';

export type BlockPartGeometryData = {
  materialPath?: string;
  position: Num3;
  rotation?: Num3;
  scale?: Num3 | number;
  parts: BlockPartGeometryData[];
  name: string;
};

export default BlockPartGeometryData;

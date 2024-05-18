import BlockType, { ShapeType } from './BlockType';

export type BlockSlotSource = {
  slotName: string;
  blockId: string;
};

type Block<S extends ShapeType = ShapeType> = {
  id: string;
  children: string[];
  dependsOn: string[];
  dependents: string[];
  isHovered: boolean;
  isSelected: boolean;
  slotSources: BlockSlotSource[];
  slotTarget?: {
    slotName: string;
    blockId: string;
  };
  parent?: string;
} & BlockType<S>;

export type PartialMeshData = Partial<Block> & { id: string };

export default Block;

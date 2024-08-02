import Block from '../../types/Block';
import BlockDecoration, { BlockCategories, BlockCategoryRecords } from '../../types/BlockCategory';

export type BlockState = {
  blocks: Record<string, Block>;
  blockIds: string[];
  decorations: BlockCategoryRecords;
  hovered?: {
    block: string;
    partIndex?: string;
  };
  rootBlocksIds: string[];
  selectedRootBlockIds: string[];
  selectedBlocks: Record<string, boolean>;
  selectedPartIndexes: Record<string, string[]>;
};

export type BlockSlices = 'city' | 'building';

export type DecorationUpdate<K extends BlockDecoration> = {
  type: 'update';
  decoration: BlockCategories[K];
  slice: BlockSlices;
};

export type BlockUpdate = { type: 'update'; block: Block; slice: BlockSlices };

export type BlockSelect = { select: string | null; partIndex?: string; slice: BlockSlices };

export type BlockHover = { hover: string | null; partIndex?: string; slice: BlockSlices };

export type BlockRemove = { remove: Block; slice: BlockSlices };

// Update type constrained to keys and values from BlockCategories
export type UpdateBlock<K extends BlockDecoration> =
  | BlockUpdate
  | DecorationUpdate<K>
  | BlockRemove
  | BlockSelect
  | BlockHover;

export type UpdateBlocks = { blockUpdates: Array<UpdateBlock<BlockDecoration>>; history?: boolean };

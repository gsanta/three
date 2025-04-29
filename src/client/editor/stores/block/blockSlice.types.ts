import BlockType from '../../models/BlockType';
import BlockDecoration, { BlockCategories, BlockCategoryRecords } from '../../models/BlockCategory';

export type BlockState = {
  blocks: Record<string, BlockType>;
  blockIds: string[];
  decorations: BlockCategoryRecords;
  hovered?: {
    block: string;
    partIndex?: string;
  };
  rootBlocksIds: string[];
  selectedBlocks: string[];
};

export type BlockSlices = 'city' | 'building';

export type DecorationUpdate<K extends BlockDecoration> = {
  type: 'update';
  decoration: BlockCategories[K];
  slice: BlockSlices;
};

export type BlockUpdate = { type: 'update'; block: BlockType; slice: BlockSlices };

export type BlockSelect = {
  select: BlockType[];
  partIndex?: string;
  slice: BlockSlices;
};

export type BlockHover = { hover: string | null; partIndex?: string; slice: BlockSlices };

export type BlockRemove = { remove: BlockType; slice: BlockSlices };

// Update type constrained to keys and values from BlockCategories
export type UpdateBlock<K extends BlockDecoration> =
  | BlockUpdate
  | DecorationUpdate<K>
  | BlockRemove
  | BlockSelect
  | BlockHover;

export type UpdateBlocks = { blockUpdates: Array<UpdateBlock<BlockDecoration>>; history?: boolean };

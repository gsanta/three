import BlockData from '../../models/block/BlockData';
import { BlockCategoryRecords, BlockDecorationType } from '../../models/block/BlockDecoration';

export type BlockState = {
  blocks: Record<string, BlockData>;
  blockIds: string[];
  currentPlayer?: string;
  decorations: BlockCategoryRecords;
  hovered?: {
    block: string;
    partIndex?: string;
  };
  rootBlocksIds: string[];
  selectedBlocks: string[];
};

export type BlockSlices = 'city' | 'building';

export type DecorationUpdate = {
  type: 'update';
  decoration: BlockDecorationType;
  slice: BlockSlices;
};

export type BlockUpdate = { type: 'update'; block: BlockData; slice: BlockSlices };

export type BlockSelect = {
  select: BlockData[];
  partIndex?: string;
};

export type BlockHover = { hover: string | null; partIndex?: string; slice: BlockSlices };

export type BlockRemove = { remove: BlockData; slice: BlockSlices };

// Update type constrained to keys and values from BlockCategories
export type UpdateBlock = BlockUpdate | DecorationUpdate | BlockRemove | BlockSelect | BlockHover;

export type UpdateBlocks = { blockUpdates: Array<UpdateBlock>; history?: boolean };

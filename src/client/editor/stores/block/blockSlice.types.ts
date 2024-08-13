import ElectricConnection from '../../services/electricity/types/ElectricConnection';
import ElectricNode from '../../services/electricity/types/ElectricNode';
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
  store: BlockSlices;
};

export type BlockUpdate = { type: 'update'; block: Block; store: BlockSlices };

export type BlockSelect = { select: string | null; partIndex?: string; store: BlockSlices };

export type BlockHover = { hover: string | null; partIndex?: string; store: BlockSlices };

export type BlockRemove = { remove: Block; store: BlockSlices };

export type ElectricNodeUpdate = {
  store: 'electricity';
  node: ElectricNode;
};

export type ElectricConnectionUpdate = {
  store: 'electricity';
  connection: ElectricConnection;
};

// Update type constrained to keys and values from BlockCategories
export type UpdateBlock<K extends BlockDecoration> =
  | BlockUpdate
  | DecorationUpdate<K>
  | BlockRemove
  | BlockSelect
  | BlockHover
  | ElectricNodeUpdate;

export type UpdateBlocks = { blockUpdates: Array<UpdateBlock<BlockDecoration>>; history?: boolean };

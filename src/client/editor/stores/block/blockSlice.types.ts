import Block from '../../types/Block';
import BlockDecoration, { BlockCategories } from '../../types/BlockCategory';

export type DecorationUpdate<K extends BlockDecoration> = {
  type: 'update';
  decoration: BlockCategories[K];
  slice: 'city' | 'building';
};

export type BlockUpdate = { type: 'update'; block: Block; slice: 'city' | 'building' };

export type BlockSelect = { select: string | null; partIndex?: string; slice: 'city' | 'building' };

export type BlockRemove = { remove: Block; slice: 'city' | 'building' };

// Update type constrained to keys and values from BlockCategories
export type UpdateBlock<K extends BlockDecoration> = BlockUpdate | DecorationUpdate<K> | BlockRemove | BlockSelect;

export type UpdateBlocks = { blockUpdates: Array<UpdateBlock<BlockDecoration>>; history?: boolean };

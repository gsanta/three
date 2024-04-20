import Edit from './Edit';
import BlockStore from './BlockStore';
import { Store } from '@/common/utils/store';

class UpdateService {
  constructor(blockStore: BlockStore, dispatchStore: Store) {
    this.store = blockStore;
    this.dispatchStore = dispatchStore;
  }

  getUpdate(): Edit {
    return new Edit(this.store, this.dispatchStore);
  }

  // create<T extends BlockCategory | never = never>(
  //   blockName: BlockName,
  //   options: Partial<Block> = {},
  //   decorationOptions: Partial<BlockCategories[T]> = {},
  // ): UpdateBlock & { block: Block } {
  //   const { blocks } = this.store.getState().blockSettings.present;
  //   const blockType = getBlock(blocks, blockName);

  //   const factory = this.updaters[blockType.category];

  //   if (!factory) {
  //     throw new Error(`Factory for type ${blockType.category} not found`);
  //   }

  //   const { block, decoration } = factory.create(blockType, options, decorationOptions);

  //   return {
  //     block,
  //     category: blockType.category,
  //     decoration,
  //   } as UpdateBlock & { block: Block };
  // }

  private store: BlockStore;

  private dispatchStore: Store;
}

export default UpdateService;

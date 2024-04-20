import Update from './Update';
import BlockStore from './BlockStore';

class UpdateService {
  constructor(store: BlockStore) {
    this.store = store;
  }

  getUpdate(): Update {
    return new Update(this.store);
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
}

export default UpdateService;

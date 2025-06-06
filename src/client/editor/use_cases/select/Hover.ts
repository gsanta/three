import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import BlockPartLookupData from '../../models/block/part/BlockPartLookupData';

class Hover {
  constructor(blockStore: BlockStore, updateService: TransactionService) {
    this.blockStore = blockStore;
    this.updateService = updateService;
  }

  unhover() {
    const hovered = this.blockStore.getHovered();
    const blockId = hovered?.block;

    if (!blockId) {
      return;
    }

    const edit = this.updateService.createTransaction();

    edit.hover(null);

    // edit.updateBlock(hovered.block, {
    //   partDetails: this.changePlaceholderVisibility(hovered.block, true),
    // });

    edit.commit(false);
  }

  hover(blockId: string, partIndex?: string) {
    // store.dispatch(hover({ block: blockId, partIndex: partIndex }));

    const edit = this.updateService.createTransaction();
    edit.hover(blockId, partIndex);

    // edit.updateBlock(blockId, {
    //   partDetails: this.changePlaceholderVisibility(blockId, false),
    // });

    edit.commit(false);
  }

  private changePlaceholderVisibility(blockId: string, hide: boolean) {
    const block = this.blockStore.getBlock(blockId);

    const change: Record<string, Partial<BlockPartLookupData>> = {};

    Object.keys(block.partDetails)
      .filter((key) => block.partDetails[key]?.type === 'placeholder')
      .map((key) => {
        change[key] = { hide };
      });

    return change;
  }

  private blockStore: BlockStore;

  private updateService: TransactionService;
}

export default Hover;

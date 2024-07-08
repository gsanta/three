import { store } from '@/client/common/utils/store';
import { hover } from '../../stores/block/blockSlice';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import { ModelPartInfo } from '../../types/BlockType';

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

    const block = this.blockStore.getBlock(blockId);

    if (this.blockStore.isDescendentSelected(block, true)) {
      return;
    }

    store.dispatch(hover(undefined));
    const edit = this.updateService.getTransaction();

    edit.updateBlock(hovered.block, {
      partDetails: this.changePlaceholderVisibility(hovered.block, true),
    });

    edit.commit();
  }

  hover(blockId: string, partIndex?: string) {
    store.dispatch(hover({ block: blockId, partIndex: partIndex }));
    const edit = this.updateService.getTransaction();

    edit.updateBlock(blockId, {
      partDetails: this.changePlaceholderVisibility(blockId, false),
    });

    edit.commit();
  }

  private changePlaceholderVisibility(blockId: string, hide: boolean) {
    const block = this.blockStore.getBlock(blockId);

    const change: Record<string, Partial<ModelPartInfo>> = {};

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

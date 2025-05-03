import BlockStore from '../../stores/block/BlockStore';
import { store } from '@/client/common/utils/store';
import { updateSelectTool } from '../../stores/tool/toolSlice';
import TransactionService from '../../services/transaction/TransactionService';
import BlockCategoryStore from '../../stores/blockCategory/BlockCategoryStore';

class SelectBlock {
  constructor(blockStore: BlockStore, blockCategoryStore: BlockCategoryStore, updateService: TransactionService) {
    this.blockCategoryStore = blockCategoryStore;
    this.blockStore = blockStore;
    this.updateService = updateService;
  }

  select(blockId: string | undefined) {
    if (blockId) {
      const alreadySelectedBlockIds = this.blockCategoryStore.getSelectedBlocks();
      if (!alreadySelectedBlockIds[blockId]) {
        const block = this.blockStore.getBlocks()[blockId];
        const edit = this.updateService.createTransaction();

        const alreadySelectedBlocks = Object.keys(alreadySelectedBlockIds).map((id) => this.blockStore.getBlock(id));

        edit.select([...alreadySelectedBlocks, this.blockStore.getBlock(blockId)]);

        store.dispatch(updateSelectTool({ moveAxis: block.moveAxis }));

        edit.commit();
      }
    } else {
      const edit = this.updateService.createTransaction();
      edit.select([]);
      edit.commit();
    }
  }

  private blockCategoryStore: BlockCategoryStore;

  private blockStore: BlockStore;

  private updateService: TransactionService;
}

export default SelectBlock;

import BlockStore from '../../stores/block/BlockStore';
import Edit from '../../services/update/Edit';
import TransactionService from '../../services/transaction/TransactionService';
import BlockEraser from './erasers/BlockEraser';
import CableEraser from './erasers/CableEraser';

class EraseBlock {
  constructor(store: BlockStore, update: TransactionService) {
    this.store = store;
    this.update = update;

    this.erasers.cables = new CableEraser(store);
  }

  erase(blockIds: string[]) {
    const queue = [...blockIds];

    const blocksToRemove: string[] = [];

    const edit = this.update.getTransaction();

    while (queue.length) {
      const next = queue.shift();
      if (next) {
        const block = this.store.getBlocks()[next];
        queue.push(...block.children);
        queue.push(...block.dependents);
        blocksToRemove.push(next);
        edit.remove(next);
      }
    }

    blocksToRemove.forEach((blockId) => this.removeBlock(blockId, edit));

    edit.commit();
  }

  private removeBlock(blockId: string, edit: Edit) {
    const block = this.store.getBlocks()[blockId];

    const parent = this.store.getBlocks()[block.parent || ''];

    if (parent) {
      edit.updateBlock(parent.id, { children: [blockId] }, { arrayMergeStrategy: 'exclude' });
    }

    const eraser = this.erasers[block.category];

    if (eraser) {
      eraser.erase(edit, block);
    }

    if (block.connectedTo) {
      edit.updateBlock(
        block.parent || '',
        {
          partDetails: {
            [block.connectedTo]: {
              connectedTo: undefined,
            },
          },
        },
        { arrayMergeStrategy: 'replace' },
      );
    }

    block.dependsOn.forEach((dependsOnId) => {
      edit.updateBlock(dependsOnId, { dependents: [block.id] }, { arrayMergeStrategy: 'exclude' });
    });

    block.dependents.forEach((dependentId) => {
      const dependent = this.store.getBlocks()[dependentId];

      dependent.dependsOn.forEach((dependsOnId) => {
        edit.updateBlock(dependsOnId, { dependents: [dependentId] }, { arrayMergeStrategy: 'exclude' });
      });
    });
  }

  private store: BlockStore;

  private update: TransactionService;

  private erasers: Partial<{ [key: string]: BlockEraser }> = {};
}

export default EraseBlock;

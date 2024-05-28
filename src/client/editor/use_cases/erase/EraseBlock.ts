import { BlockCategories } from '@/client/editor/types/BlockCategory';
import BlockStore from '../../stores/block/BlockStore';
import Edit from '../../services/update/Edit';
import TransactionService from '../../services/transaction/TransactionService';
import BlockEraser from './erasers/BlockEraser';
import PoleEraser from './erasers/PoleEraser';

class EraseBlock {
  constructor(store: BlockStore, update: TransactionService) {
    this.store = store;
    this.update = update;

    this.erasers.poles = new PoleEraser(store);
  }

  erase(blockIds: string[]) {
    const queue = [...blockIds];

    const blocksToRemove: string[] = [];

    const edit = this.update.getUpdate();

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

    if (block.slotTarget) {
      edit.updateBlock(
        block.slotTarget.blockId,
        { slotSources: [{ blockId: block.id, slotName: block.slotTarget.slotName }] },
        { arrayMergeStrategy: 'exclude' },
      );
    }

    block.dependsOn.forEach((dependsOnId) => {
      edit.updateBlock(dependsOnId, { dependents: [block.id] }, { arrayMergeStrategy: 'exclude' });
    });

    block.dependents.forEach((dependentId) => {
      const dependent = this.store.getBlocks()[dependentId];

      dependent.dependsOn.forEach((dependsOnId) => {
        const dependsOn = this.store.getBlocks()[dependsOnId];
        edit.updateBlock(dependsOnId, { dependents: [dependentId] }, { arrayMergeStrategy: 'exclude' });

        const eraser = this.erasers[block.category];
        if (eraser) {
          eraser.eraseDependent(edit, dependsOn, dependent);
        }
      });
    });
  }

  private store: BlockStore;

  private update: TransactionService;

  private erasers: Partial<{ [K in keyof BlockCategories]: BlockEraser }> = {};
}

export default EraseBlock;

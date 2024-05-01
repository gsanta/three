import { BlockCategories } from '@/client/editor/types/BlockCategory';
import BlockStore from '../../BlockStore';
import Edit from '../../services/update/Edit';
import UpdateService from '../../services/update/UpdateService';
import BlockEraser from './erasers/BlockEraser';
import PoleEraser from './erasers/PoleEraser';

class EraseService {
  constructor(store: BlockStore, update: UpdateService) {
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
      const newChildren = parent.children.filter((child) => child !== blockId);
      edit.updateBlock(block.id, { children: newChildren });
    }

    block.dependsOn.forEach((dependsOnId) => {
      edit.updateBlock(dependsOnId, { dependents: [block.id] }, { arrayMergeStrategy: 'exclude-update' });
    });

    block.dependents.forEach((dependentId) => {
      const dependent = this.store.getBlocks()[dependentId];

      dependent.dependsOn.forEach((dependsOnId) => {
        const dependsOn = this.store.getBlocks()[dependsOnId];
        edit.updateBlock(dependsOnId, { dependents: [dependentId] }, { arrayMergeStrategy: 'exclude-update' });

        const eraser = this.erasers[block.category];
        if (eraser) {
          eraser.eraseDependent(edit, dependsOn, dependent);
        }
      });
    });
  }

  private store: BlockStore;

  private update: UpdateService;

  private erasers: Partial<{ [K in keyof BlockCategories]: BlockEraser }> = {};
}

export default EraseService;

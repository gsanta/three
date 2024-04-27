import BlockStore from '../../BlockStore';
import Edit from '../../services/update/Edit';
import UpdateService from '../../services/update/UpdateService';

class Eraser {
  constructor(store: BlockStore, update: UpdateService) {
    this.store = store;
    this.update = update;
  }

  erase(blockIds: string[]) {
    const rootBlockIds = this.store.getRootBlockIds().filter((root) => !blockIds.includes(root));

    const blocksToRemove: string[] = [];

    const edit = this.update.getUpdate();

    while (rootBlockIds.length) {
      const next = rootBlockIds.shift();
      if (next) {
        const block = this.store.getBlocks()[next];
        rootBlockIds.push(...block.children);
        rootBlockIds.push(...block.dependents);
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
      const dependingBlock = this.store.getBlocks()[dependsOnId];
      const dependents = dependingBlock.dependents.filter((id) => id !== block.id);

      edit.updateBlock(dependsOnId, { dependents }, { mergeArrays: false });
    });
  }

  private store: BlockStore;

  private update: UpdateService;
}

export default Eraser;

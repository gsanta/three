import BlockStore from './BlockStore';
import Update from './Update';
import UpdateService from './UpdateService';

class EraseService {
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
  }

  private removeBlock(blockId: string, edit: Update) {
    const block = this.store.getBlocks()[blockId];

    const parent = this.store.getBlocks()[block.parent || ''];

    if (parent) {
      const newChildren = parent.children.filter((child) => child !== blockId);
      edit.updateBlock(block.id, { children: newChildren });
    }

    block.dependsOn.forEach((dependsOnId) => {});

    delete this.store.getBlocks()[blockId];
  }

  private store: BlockStore;

  private update: UpdateService;
}

export default EraseService;

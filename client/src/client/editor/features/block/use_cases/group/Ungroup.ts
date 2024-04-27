import Edit from '../../services/update/Edit';
import BlockStore from '../../BlockStore';

class Ungroup {
  constructor(blocks: BlockStore) {
    this.blocks = blocks;
  }

  execute(ids: string[], edit: Edit) {
    ids.forEach((blockId) => {
      if (this.blocks.getBlocks()[blockId].name === 'group') {
        this.ungroupedIds.push(...this.blocks.getBlocks()[blockId].children);

        this.blocks.getBlocks()[blockId].children.forEach((id) => edit.updateBlock(id, { parent: undefined }));

        edit.remove(blockId);
      } else {
        this.ungroupedIds.push(blockId);
      }
    });

    return this.ungroupedIds;
  }

  private blocks: BlockStore;

  ungroupedIds: string[] = [];
}

export default Ungroup;

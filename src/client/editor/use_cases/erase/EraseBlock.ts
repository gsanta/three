import BlockStore from '../../stores/block/BlockStore';
import Edit from '../../services/update/Edit';
import TransactionService from '../../services/transaction/TransactionService';
import BlockEraser from './erasers/BlockEraser';
import CableEraser from './erasers/CableEraser';
import { NeigbourConnection } from '../../types/Block';

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
        queue.push(...block.childConnections.map((child) => child.childBlock));
        queue.push(...block.conduitConnections.map((child) => child.block));
        blocksToRemove.push(next);
        edit.remove(next);
      }
    }

    blocksToRemove.forEach((blockId) => this.removeBlock(blockId, edit));

    edit.commit();
  }

  private removeBlock(blockId: string, edit: Edit) {
    const block = this.store.getBlocks()[blockId];

    const parent = this.store.getBlocks()[block.parentConnection?.block || ''];

    if (parent) {
      edit.updateBlock(parent.id, { childConnections: [{ childBlock: blockId }] }, { arrayMergeStrategy: 'exclude' });
    }

    const eraser = this.erasers[block.category];

    if (eraser) {
      eraser.erase(edit, block);
    }

    block.neighbourConnections.forEach((connection) => {
      edit.updateBlock(
        connection.neighbourBlock,
        {
          neighbourConnections: [{ id: connection.id } as NeigbourConnection],
        },
        { arrayMergeStrategy: 'exclude' },
      );
    });

    // block.conduitConnections.forEach((connection) => {
    //   const connectedBlock = this.store.getBlock(connection.block);

    //   connectedBlock.decorations.forEach((decoration) => {
    //     this.erasers[decoration]?.associationErased(edit, connectedBlock, block);
    //   });
    // });
  }

  private store: BlockStore;

  private update: TransactionService;

  private erasers: Partial<{ [key: string]: BlockEraser }> = {};
}

export default EraseBlock;

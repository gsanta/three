import AddBlock from '../../controllers/tools/add/AddBlock';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import Block from '../../types/Block';
import BlockType from '../../types/BlockType';
import Num3 from '../../types/Num3';

class AddHouse {
  constructor(blockStore: BlockStore, updateService: TransactionService, addBlock: AddBlock) {
    this.blockStore = blockStore;
    this.updateService = updateService;
    this.addBlock = addBlock;
  }

  add({
    targetBlock,
    targetPartIndex,
    newBlockType,
    clientX,
    clientY,
    position,
  }: {
    targetBlock: Block | undefined;
    targetPartIndex: string | undefined;
    newBlockType: BlockType;
    clientX: number;
    clientY: number;
    position: Num3;
  }) {
    const addBlock = this.addBlock.getAddBlock(newBlockType.category, 'plain');

    const edit = this.updateService.getTransaction();

    addBlock?.perform({
      edit,
      clientX,
      clientY,
      targetBlock,
      targetPartIndex,
      newBlockType,
      position,
    });

    edit.commit(false);

    this.buildingBaseId = edit.getLastBlock()?.id;
  }

  performAfterRender() {
    if (this.buildingBaseId) {
      const block = this.blockStore.getBlock(this.buildingBaseId);

      const addWall = this.addBlock.getAddBlock('walls', block.category);

      const edit = this.updateService.getTransaction();

      ['#2', '#3', '#4', '#5'].forEach((index) => {
        addWall?.perform({
          edit,
          targetBlock: block,
          targetPartIndex: index,
          newBlockType: this.blockStore.getBlockType('wall-1'),
          clientX: 0,
          clientY: 0,
          position: [0, 0, 0],
        });
      });

      const addRoof = this.addBlock.getAddBlock('roofs', block.category);

      addRoof?.perform({
        edit,
        targetBlock: block,
        targetPartIndex: '#6',
        newBlockType: this.blockStore.getBlockType('roof-1'),
        clientX: 0,
        clientY: 0,
        position: [0, 0, 0],
      });

      edit.commit();
    }

    this.buildingBaseId = undefined;
  }

  private buildingBaseId?: string;

  private blockStore: BlockStore;

  private updateService: TransactionService;

  private addBlock: AddBlock;
}

export default AddHouse;
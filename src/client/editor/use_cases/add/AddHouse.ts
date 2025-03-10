import AddService from '../../controllers/tools/add/AddService';
import TransactionService from '../../services/transaction/TransactionService';
import Edit from '../../services/transaction/Edit';
import BlockStore from '../../stores/block/BlockStore';
import Block from '../../types/Block';
import BlockType from '../../types/BlockType';
import Num3 from '../../types/Num3';
import FactoryService from '../../services/factory/FactoryService';

class AddHouse {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    updateService: TransactionService,
    addBlock: AddService,
  ) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;
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

    const edit = this.updateService.createTransaction();

    addBlock?.perform({
      edit,
      clientX,
      clientY,
      targetBlock,
      targetPartIndex,
      newBlockType,
      position,
    });

    this.buildingBaseId = edit.getLastBlock()?.id;

    // edit.updateBlock(this.buildingBaseId, { notifyOnRender: true });

    this.addRoom(edit);

    edit.commit(false);
  }

  performAfterRender(): boolean {
    if (this.buildingBaseId) {
      const block = this.blockStore.getBlock(this.buildingBaseId);

      const addWall = this.addBlock.getAddBlock('walls', block.category);

      const edit = this.updateService.createTransaction();

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
    return true;
  }

  private addRoom(edit: Edit) {
    const addBlock = this.addBlock.getAddBlock('rooms', 'plain');

    const room = this.blockStore.getBlockType('room-1');

    addBlock?.perform({
      edit,
      clientX: 0,
      clientY: 0,
      targetBlock: undefined,
      targetPartIndex: undefined,
      newBlockType: room,
      position: [0, 0, 0],
    });

    const addFurnitureBlock = this.addBlock.getAddBlock('furnitures', 'rooms');

    const roomBlock = edit.getLastBlock();

    const rug = this.blockStore.getBlockType('rug-1');

    addFurnitureBlock?.perform({
      edit,
      clientX: 0,
      clientY: 0,
      targetBlock: roomBlock,
      targetPartIndex: undefined,
      newBlockType: rug,
      position: [0, 0.5, 0],
    });

    this.factoryService.create(
      edit,
      'cable-1',
      {
        block: { parentConnection: { block: roomBlock.id, part: '#2' }, isDirty: true },
        decorations: {
          cables: {
            points: [
              {
                position: [0, 0, 0],
                blockId: roomBlock.id,
              },
            ],
          },
        },
      },
      'building',
    );

    edit.updateBlock(
      roomBlock.id,
      { childConnections: [{ childBlock: edit.getLastBlock().id }] },
      { arrayMergeStrategy: 'merge', slice: 'building' },
    );

    this.factoryService.create(
      edit,
      'cable-1',
      {
        block: { parentConnection: { block: roomBlock.id, part: '#3' }, isDirty: true },
        decorations: {
          cables: {
            points: [
              {
                position: [0, 0, 0],
                blockId: roomBlock.id,
              },
            ],
          },
        },
      },
      'building',
    );

    edit.updateBlock(
      roomBlock.id,
      { childConnections: [{ childBlock: edit.getLastBlock().id }] },
      { arrayMergeStrategy: 'merge', slice: 'building' },
    );

    // roomBlock.childConnections.push({ childBlock: edit.getLastBlock().id });

    const shelf = this.blockStore.getBlockType('shelf-1');

    addFurnitureBlock?.perform({
      edit,
      clientX: 0,
      clientY: 0,
      targetBlock: roomBlock,
      targetPartIndex: undefined,
      newBlockType: shelf,
      position: [-5.5, 0.5, 0],
    });

    const television = this.blockStore.getBlockType('television-1');

    addFurnitureBlock?.perform({
      edit,
      clientX: 0,
      clientY: 0,
      targetBlock: roomBlock,
      targetPartIndex: undefined,
      newBlockType: television,
      position: [-5.5, 1.7, 0],
    });
  }

  private buildingBaseId?: string;

  private blockStore: BlockStore;

  private updateService: TransactionService;

  private addBlock: AddService;

  private factoryService: FactoryService;
}

export default AddHouse;

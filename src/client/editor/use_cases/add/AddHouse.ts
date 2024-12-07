import AddBlock from '../../controllers/tools/add/AddBlock';
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
    addBlock: AddBlock,
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
    this.cableIds = [];
    this.roomId = '';

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

    this.addElectricity();

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

    this.roomId = edit.getLastBlock().id;

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
        block: {
          conduitParentConnections: [{ block: roomBlock.id }, { block: roomBlock.id }],
          isDirty: true,
        },
        decorations: {
          cables: {
            end1: { pin: '#4', device: roomBlock.id },
            end2: { pin: '#6', device: roomBlock.id },
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

    this.cableIds.push(edit.getLastBlock().id);

    edit.updateBlock(
      roomBlock.id,
      { childConnections: [{ childBlock: edit.getLastBlock().id }] },
      { arrayMergeStrategy: 'merge', slice: 'building' },
    );

    this.factoryService.create(
      edit,
      'cable-1',
      {
        block: {
          conduitParentConnections: [{ block: roomBlock.id }, { block: roomBlock.id }],
          isDirty: true,
        },
        decorations: {
          cables: {
            end1: { pin: '#5', device: roomBlock.id },
            end2: { pin: '#6', device: roomBlock.id },
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

    this.cableIds.push(edit.getLastBlock().id);

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

  private addElectricity() {
    const edit = this.updateService.getOrCreateActiveTransaction();

    const electricMeter = this.factoryService.getElectricityFactory().createElectricMeter(this.roomId, {});

    edit.getElectricityEdit().updateNode(electricMeter);

    const fakeNodeIds: string[] = [];

    Array.from({ length: this.cableIds.length - 1 }).forEach(() => {
      const node = this.factoryService.getElectricityFactory().createFakeNode(this.roomId);
      fakeNodeIds.push(node.id);
      edit.getElectricityEdit().updateNode(node);
    });

    const nodeIds = [electricMeter.id, ...fakeNodeIds, electricMeter.id];

    for (let i: number = 0; i < 2; i++) {
      const connection = this.factoryService
        .getElectricityFactory()
        .createElectricConnection(this.roomId, { node1: nodeIds[i], node2: nodeIds[i + 1] });

      edit.getElectricityEdit().updateConnection(connection);
    }
  }

  private roomId: string = '';

  private cableIds: string[] = [];

  private buildingBaseId?: string;

  private blockStore: BlockStore;

  private updateService: TransactionService;

  private addBlock: AddBlock;

  private factoryService: FactoryService;
}

export default AddHouse;

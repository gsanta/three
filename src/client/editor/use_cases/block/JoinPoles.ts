import BlockData from '@/client/editor/models/block/BlockData';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import TransactionService from '../../services/transaction/TransactionService';
import FactoryService from '../../services/factory/FactoryService';
import BlockStore from '../../stores/block/BlockStore';
import Pole from '../../models/block/categories/Pole';
import Transformer from '../../models/block/categories/Transformer';
import AutoRotatePoles from './AutoRotatePoles';
import MakeWireConnection from './MakeWireConnection';

type ConnectPolesConfig = {
  isPreview?: boolean;
};

class JoinPoles {
  constructor(
    blockStore: BlockStore,
    sceneStore: SceneStore,
    factoryService: FactoryService,
    transactionService: TransactionService,
  ) {
    this.autoRotatePoles = new AutoRotatePoles(blockStore, transactionService);

    this.blockStore = blockStore;

    this.factoryService = factoryService;

    this.sceneStore = sceneStore;

    this.transactionService = transactionService;
  }

  join(block1: BlockData, block2: BlockData, config: ConnectPolesConfig = { isPreview: false }) {
    this.connectPolesConfig = { ...this.connectPolesConfig, ...config };

    const from = new Pole(block1, this.blockStore);
    const to = this.getTarget(block2);
    let pole2: Pole | undefined;

    if (to.getBlock().category === 'poles') {
      pole2 = to as Pole;
    } else {
      const parent = to.getBlock().parentConnection?.block;
      if (parent && this.blockStore.getBlock(parent).category === 'poles') {
        pole2 = new Pole(this.blockStore.getBlock(parent), this.blockStore);
      }
    }

    const block1Wires = this.getWireConnections(block1);
    const block2Wires = this.getWireConnections(block2);

    const pole1EmptyPinIndex = this.getElectricDevice(block1).getFirstEmptyPin(block1Wires[0]);
    const pole2EmptyPinIndex = this.getElectricDevice(block2).getFirstEmptyPin(block2Wires[0]);

    if (pole1EmptyPinIndex === undefined || pole2EmptyPinIndex === undefined) {
      throw new Error('Precondition failed: no empty pin found.');
    }

    if (pole1EmptyPinIndex > 1 || pole2EmptyPinIndex > 1) {
      throw new Error('Precondition failed: only pin 0 or 1 are valid to join poles.');
    }

    const edit = this.transactionService.createTransaction();

    if (pole2) {
      this.autoRotatePoles.execute(from, pole2);
    }

    this.makeWireConnectionList = Array.from({ length: block1Wires.length }).map(
      () => new MakeWireConnection(this.blockStore, this.factoryService, this.sceneStore, this.transactionService),
    );

    const newCableIds = block1Wires.map((partName, index) =>
      this.makeWireConnectionList[index].execute(
        { pole: from.getBlock(), partName, pinIndex: pole1EmptyPinIndex },
        { pole: to.getBlock(), partName: block2Wires[index], pinIndex: pole2EmptyPinIndex },
        this.connectPolesConfig,
      ),
    );

    edit.commit();

    return {
      cableIds: newCableIds,
    };
  }

  undo() {
    this.autoRotatePoles.undo();

    this.makeWireConnectionList.forEach((makeWireConnection) => {
      makeWireConnection.undo();
    });
    this.makeWireConnectionList = [];
  }

  private getElectricDevice(block: BlockData) {
    if (block.category === 'poles') {
      return new Pole(block, this.blockStore).getAsElectricDevice();
    } else {
      return new Transformer(block, this.blockStore).getAsElectricDevice();
    }
  }

  private getWireConnections(block: BlockData) {
    if (block.category === 'poles') {
      return new Pole(block, this.blockStore).getPoleDecorator().wires;
    } else {
      const transformer = new Transformer(block, this.blockStore);
      return transformer.getTransformerDecorator().secondaryWires;
    }
  }

  private getTarget(block: BlockData) {
    if (block.category === 'poles') {
      return new Pole(block, this.blockStore);
    }
    if (block.category === 'transformers') {
      return new Transformer(block, this.blockStore);
    }
    throw new Error(`Unsupported block category: ${block.category}`);
  }

  private autoRotatePoles: AutoRotatePoles;

  private connectPolesConfig: ConnectPolesConfig = { isPreview: false };

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private makeWireConnectionList: MakeWireConnection[] = [];

  private sceneStore: SceneStore;

  private transactionService: TransactionService;
}

export default JoinPoles;

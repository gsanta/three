import BlockPart from '@/client/editor/models/block/part/BlockPart';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import ElectricityService from '@/client/editor/stores/electricity/ElectricityService';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import DrawCable from '../../cable/DrawCable';
import AddToAnchorAsChild, { AddParams } from './AddToAnchorAsChild';
import DrawCommand from './DrawCommand';
import SceneService from '@/client/editor/ui/scene/service/SceneService';
import MeshWrapper from '@/client/editor/models/MeshWrapper';

class AddPoleMountedTransformer implements DrawCommand {
  constructor(
    blockStore: BlockStore,
    electricityService: ElectricityService,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;
    this.transactionService = transactionService;

    this.addToAnchorAsChild = new AddToAnchorAsChild(factoryService, transactionService);

    this.drawCable = new DrawCable(blockStore, factoryService, sceneStore, transactionService);

    this.electricityService = electricityService;

    this.sceneStore = sceneStore;
  }

  finish(): void {
    if (this.activeDrawCommand) {
      this.activeDrawCommand.finish();
    }

    if (this.transformerId && this.cableGroupId && this.poleId) {
      this.electricityService.makeElectricConnection(
        this.blockStore.getBlock(this.transformerId!),
        this.blockStore.getBlock(this.poleId!),
        this.blockStore.getBlock(this.cableGroupId!),
      );
    }

    this.transformerId = undefined;
    this.cableGroupId = undefined;
    this.poleId = undefined;
  }

  execute({ edit, newBlockType, to }: AddParams) {
    if (!to?.block) {
      return;
    }

    if (newBlockType.category !== 'transformers') {
      throw new Error('Invalid block type for transformer addition');
    }

    const position = new MeshWrapper(this.sceneStore.getObj3d(to.block.id))
        .findByName('TransformerHolder')
        .getWorldPosition();

    if (to?.block) {
      this.poleId = to.block.id;

      this.addToAnchorAsChild.execute({
        edit,
        newBlockType: newBlockType,
        newBlockAnchorName: 'Holder',
        position,
        to: {
          block: to.block,
          anchorPartName: 'TransformerHolder',
        },
      });

      this.transformerId = this.addToAnchorAsChild.getNewBlockId();

      this.activeDrawCommand = this.addToAnchorAsChild;
    }
  }

  executeAfterRender() {
    if (!this.transformerId || this.executedAfterRender) {
      return;
    }

    this.executedAfterRender = true;

    const edit = this.transactionService.createTransaction();

    const transformer = this.blockStore.getBlock(this.transformerId);
    const pole = this.blockStore.getBlock(transformer.parentConnection?.block);
    this.drawCable.finish(
      { part: new BlockPart(pole, 'L1'), pinIndex: 1 },
      { part: new BlockPart(transformer, 'L1'), pinIndex: 0 },
    );
    this.drawCable.finish(
      { part: new BlockPart(pole, 'L2'), pinIndex: 1 },
      { part: new BlockPart(transformer, 'L2'), pinIndex: 0 },
    );
    this.drawCable.finish(
      { part: new BlockPart(pole, 'L3'), pinIndex: 1 },
      { part: new BlockPart(transformer, 'L3'), pinIndex: 0 },
    );

    const cableGroup = this.factoryService.create(edit, 'cable-group-1', {});
    this.cableGroupId = cableGroup.id;

    edit.commit();
  }

  private activeDrawCommand?: DrawCommand;

  private transformerId?: string;

  private blockStore: BlockStore;

  private addToAnchorAsChild: AddToAnchorAsChild;

  private cableGroupId?: string;

  private poleId?: string;

  private drawCable: DrawCable;

  private executedAfterRender = false;

  private electricityService: ElectricityService;

  private factoryService: FactoryService;

  private sceneStore: SceneStore;

  private transactionService: TransactionService;
}

export default AddPoleMountedTransformer;

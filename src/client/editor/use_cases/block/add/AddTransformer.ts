import BlockTypeStore from '@/client/editor/stores/blockType/BlockTypeStore';
import AddToPlain from './AddToPlain';
import TransformerDecorator from '@/client/editor/models/block/categories/TransformerDecorator';
import AddToAnchorAsChild, { AddParams } from './AddToAnchorAsChild';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import DrawCable from '../../cable/DrawCable';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import BlockPart from '@/client/editor/models/block/part/BlockPart';

class AddTransformer {
  constructor(
    blockStore: BlockStore,
    blockTypeStore: BlockTypeStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.blockTypeStore = blockTypeStore;

    this.addToPlain = new AddToPlain(factoryService);
    this.addToAnchorAsChild = new AddToAnchorAsChild(factoryService);

    this.drawCable = new DrawCable(blockStore, factoryService, sceneStore, transactionService);
  }

  execute({ edit, newBlockType, position, to }: AddParams) {
    if (newBlockType.category !== 'transformers') {
      throw new Error('Invalid block type for transformer addition');
    }

    const transfomer = this.blockTypeStore.getDecoration<TransformerDecorator>(newBlockType.type, 'transformers');

    if (transfomer.location === 'pole-mounted') {
      if (to?.block && to.anchorPartName) {
        this.transformerId = this.addToAnchorAsChild.execute({
          edit,
          newBlockType: newBlockType,
          newBlockAnchorName: 'Holder',
          position,
          to,
        })?.id;
      }
    } else {
      this.transformerId = this.addToPlain.execute({ edit, newBlockType: newBlockType, position })?.id;
    }
  }

  executeAfterRender() {
    if (!this.transformerId || this.executedAfterRender) {
      return;
    }

    this.executedAfterRender = true;

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
  }

  private transformerId?: string;

  private blockStore: BlockStore;

  private addToPlain: AddToPlain;

  private addToAnchorAsChild: AddToAnchorAsChild;

  private blockTypeStore: BlockTypeStore;

  private drawCable: DrawCable;

  private executedAfterRender = false;
}

export default AddTransformer;

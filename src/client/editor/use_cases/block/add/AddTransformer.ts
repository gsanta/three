import BlockTypeStore from '@/client/editor/stores/blockType/BlockTypeStore';
import AddToPlain from './AddToPlain';
import TransformerDecorator from '@/client/editor/models/block/categories/TransformerDecorator';
import { AddParams } from './AddToAnchorAsChild';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import DrawCommand from './DrawCommand';
import AddPoleMountedTransformer from './AddPoleMountedTransformer';

class AddTransformer implements DrawCommand {
  constructor(
    blockStore: BlockStore,
    blockTypeStore: BlockTypeStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.blockTypeStore = blockTypeStore;

    this.addPoleMountedTransformer = new AddPoleMountedTransformer(
      blockStore,
      factoryService,
      sceneStore,
      transactionService,
    );
    this.addToPlain = new AddToPlain(factoryService, transactionService);
  }

  finish(): void {
    if (this.activeDrawCommand) {
      this.activeDrawCommand.finish();
    }

    this.activeDrawCommand = undefined;
  }

  execute(params: AddParams) {
    const { newBlockType } = params;
    if (newBlockType.category !== 'transformers') {
      throw new Error('Invalid block type for transformer addition');
    }

    const transfomer = this.blockTypeStore.getDecoration<TransformerDecorator>(newBlockType.type, 'transformers');

    if (transfomer.location === 'pole-mounted') {
      this.addPoleMountedTransformer.execute(params);
      this.activeDrawCommand = this.addPoleMountedTransformer;
    } else {
      this.addToPlain.execute(params);
      this.activeDrawCommand = this.addToPlain;
    }
  }

  executeAfterRender() {
    this.activeDrawCommand?.executeAfterRender?.();
  }

  private addPoleMountedTransformer: AddPoleMountedTransformer;

  private activeDrawCommand?: DrawCommand;

  private addToPlain: AddToPlain;

  private blockTypeStore: BlockTypeStore;
}

export default AddTransformer;

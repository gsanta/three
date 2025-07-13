import TransactionService from '@/client/editor/services/transaction/TransactionService';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import SceneService from '@/client/editor/ui/scene/service/SceneService';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import Vector from '@/client/editor/models/math/Vector';
import Edit from '@/client/editor/services/transaction/Edit';
import AddToPlain from './AddToPlain';
import DrawCommand from './DrawCommand';

type AddParams = {
  edit: Edit;

  newBlockType: BlockConstantData;

  position: Vector;
};

class AddPole implements DrawCommand {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;

    this.transactionService = transactionService;

    this.addToPlain = new AddToPlain(factoryService, transactionService);

    this.onMeshRendered = this.onMeshRendered.bind(this);

    sceneService.subscribeMeshRendered(this.onMeshRendered);
  }

  finish(): void {
    this.addToPlain.finish();
  }

  execute({ edit, newBlockType, position }: AddParams) {
    this.addToPlain.execute({ edit, newBlockType, position });
    this.tmpBlockId = edit.getLastBlock().id;
  }

  private onMeshRendered(blockId: string) {
    if (blockId === this.tmpBlockId) {
      this.tmpBlockId = undefined;

      const edit = this.transactionService.createTransaction();

      this.blockStore.getBlock(blockId);

      edit.commit();
    }
  }

  private addToPlain: AddToPlain;

  private blockStore: BlockStore;

  private tmpBlockId?: string;

  private transactionService: TransactionService;
}

export default AddPole;

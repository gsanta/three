import TransactionService from '@/client/editor/services/transaction/TransactionService';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import JoinPoles from '@/client/editor/use_cases/block/JoinPoles';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import SceneService from '@/client/editor/ui/scene/service/SceneService';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import Vector from '@/client/editor/models/math/Vector';
import Edit from '@/client/editor/services/transaction/Edit';
import AddToPlain from './AddToPlain';

type AddParams = {
  edit: Edit;

  newBlockType: BlockConstantData;

  position: Vector;
};

class AddPole {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;

    this.transactionService = transactionService;

    this.addToPlain = new AddToPlain(factoryService);

    this.onMeshRendered = this.onMeshRendered.bind(this);

    this.joinPoles = new JoinPoles(blockStore, sceneStore, factoryService, transactionService);

    sceneService.subscribeMeshRendered(this.onMeshRendered);
  }

  execute({ edit, newBlockType, position }: AddParams) {
    this.addToPlain.execute({ edit, newBlockType, position });
    this.tmpBlockId = edit.getLastBlock().id;
  }

  private onMeshRendered(blockId: string) {
    if (blockId === this.tmpBlockId) {
      this.tmpBlockId = undefined;

      const edit = this.transactionService.createTransaction();

      const newPole = this.blockStore.getBlock(blockId);

      // this.joinPoles.join(newPole);

      edit.commit();
    }
  }

  private addToPlain: AddToPlain;

  private blockStore: BlockStore;

  private joinPoles: JoinPoles;

  private tmpBlockId?: string;

  private transactionService: TransactionService;
}

export default AddPole;

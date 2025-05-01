import AddBlockToBlock from './AddBlockToBlock';
import AddBlock from './AddBlock';
import AddContext from './AddContext';
import AddPoles from './AddPoles';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import ExecuteAddParams from './ExecuteAddParams';
import AddBlockToSlot from './AddBlockToSlot';
import AddSlotToSlot from './AddSlotToSlot';
import BlockAddMethod from '@/common/model_types/BlockAddMethod';
import BlockCategoryStore from '@/client/editor/stores/blockCategory/BlockCategoryStore';
import BlockStore from '@/client/editor/stores/block/BlockStore';

class AddService {
  constructor(
    blockStore: BlockStore,
    blockCategoryStore: BlockCategoryStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    update: TransactionService,
  ) {
    this.blockCategoryStore = blockCategoryStore;
    this.update = update;
    this.addBlock = [
      new AddBlockToBlock(blockStore, factoryService),
      new AddPoles(blockStore, factoryService, sceneStore, update),
      new AddBlockToSlot(factoryService, sceneStore),
      new AddSlotToSlot(factoryService, sceneStore),
    ];
  }

  execute(params: Omit<ExecuteAddParams, 'addMethod'>) {
    const { executionPhase } = params;
    const edit = this.update.createTransaction();

    this.blockCategoryStore
      .getAddMethodsByCategory(params.newBlockType.category)
      .filter((addMethod) =>
        executionPhase === 'afterRender' ? addMethod.executeAfterRender : !addMethod.executeAfterRender,
      )
      .filter((addMethod) => this.filterAddMethod(addMethod, params))
      .forEach((addMethod) => {
        const addMethodHandler = this.addBlock.find((addBlock) => addMethod.name === addBlock.name);
        addMethodHandler?.perform({ ...params, addMethod, edit, addContext: this.addContext });
      });

    if (edit.hasLastBlock()) {
      this.addContext.addedBlockId = edit.getLastBlock().id;
    }

    edit.commit();
  }

  private filterAddMethod(addMethod: BlockAddMethod, params: Omit<ExecuteAddParams, 'addMethod'>) {
    if (params.executionPhase === 'afterRender' && addMethod.executeAfterRender) {
      return true;
    }

    switch (addMethod.name) {
      case 'add-slot-to-slot':
      case 'add-block-to-slot':
        return params.targetPartIndex;
      case 'add-block-to-block':
        return !params.targetPartIndex;
    }

    throw new Error(`addMethod '${addMethod.name}' not handled`);
  }

  private addBlock: AddBlock[] = [];

  private addContext: AddContext = {};

  private update: TransactionService;

  private blockCategoryStore: BlockCategoryStore;
}

export default AddService;

import AddBlockToBlock from './AddBlockToBlock';
import AddBlock from './AddBlock';
import AddContext from './AddContext';
import AddFurnitureBlock from './AddFurnitureBlock';
import AddHomeElectricsBlock from './AddHomeElectricsBlock';
import AddPoles from './AddPoles';
import AddRoadBlock from './AddRoadBlock';
import AddRoofBlock from './AddRoofBlock';
import AddRoomBlock from './AddRoomBlock';
import AddSocketBlock from './AddSocketBlock';
import AddWallBlock from './AddWallBlock';
import AddWeatherHeadBlock from './AddWeatherHeadBlock';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import SceneService from '@/client/editor/components/scene/service/SceneService';
import FactoryService from '@/client/editor/services/factory/FactoryService';
import TransactionService from '@/client/editor/services/transaction/TransactionService';
import DataContext from '@/client/editor/contexts/DataContext';
import ExecuteAddParams from './ExecuteAddParams';
import AddBlockToSlot from './AddBlockToSlot';
import AddSlotToSlot from './AddSlotToSlot';
import BlockAddMethod from '@/common/model_types/BlockAddMethod';

class AddService {
  constructor(
    data: DataContext,
    factoryService: FactoryService,
    sceneService: SceneService,
    sceneStore: SceneStore,
    update: TransactionService,
  ) {
    this.data = data;
    this.update = update;
    this.addBlock = [
      new AddBlockToBlock(factoryService),
      // new AddFurnitureBlock(factoryService),
      // new AddHomeElectricsBlock(blockStore, factoryService, sceneService, sceneStore, update),
      new AddPoles(data.block, factoryService, sceneStore, update),
      new AddBlockToSlot(factoryService, sceneStore),
      new AddSlotToSlot(data.block, factoryService, sceneStore, update),
      // new AddRoofBlock(blockStore, factoryService, sceneStore, update),
      // new AddRoomBlock(factoryService),
      // new AddSocketBlock(blockStore, factoryService, sceneService, sceneStore, update),
      // new AddWallBlock(blockStore, factoryService, sceneStore, update),
      // new AddWeatherHeadBlock(blockStore, factoryService, sceneService, sceneStore, update),
    ];
  }

  execute(params: ExecuteAddParams) {
    const { executionPhase } = params;
    const edit = this.update.createTransaction();

    this.data.blockCategory
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

  private filterAddMethod(addMethod: BlockAddMethod, params: ExecuteAddParams) {
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

  private data: DataContext;

  private update: TransactionService;
}

export default AddService;

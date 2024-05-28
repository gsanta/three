import Tool from '@/client/editor/types/Tool';
import ToolName from '@/client/editor/types/ToolName';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import JoinPoles from '../../use_cases/block/JoinPoles';
import TransactionService from '../../services/update/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import FactoryService from '../../services/factory/FactoryService';

class CableTool extends Tool {
  constructor(blockStore: BlockStore, factoryService: FactoryService, scene: SceneStore, update: TransactionService) {
    super(blockStore, update, ToolName.Cable);

    this.factoryService = factoryService;

    this.scene = scene;
    this.updateService = update;
  }

  onExecute() {
    const blocks = this.store.getBlocks();
    const selectedBlockIds = this.store.getSelectedRootBlockIds();

    const polesIds = selectedBlockIds.filter((id) => blocks[id].category === 'poles');

    if (polesIds.length < 2) {
      return;
    }

    const joinPoles = new JoinPoles(this.scene, this.factoryService, this.updateService);

    joinPoles.join(blocks[polesIds[0]], blocks[polesIds[1]]);
  }

  private factoryService: FactoryService;

  private scene: SceneStore;

  private updateService: TransactionService;
}

export default CableTool;

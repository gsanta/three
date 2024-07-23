import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import Block from '../../types/Block';
import { CablePoint } from '../../types/block/Cable';

class AddWirePoints {
  constructor(blockStore: BlockStore, factoryService: FactoryService, updateService: TransactionService) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;
    this.updateService = updateService;
  }

  add(buildingBlock: Block, points: CablePoint[]) {
    const edit = this.updateService.getTransaction();

    const cableId = buildingBlock.conduitConnections.find(
      ({ block }) => this.blockStore.getBlock(block).category === 'cables',
    )?.block;

    let block: Block | null = null;

    if (cableId) {
      block = this.blockStore.getBlock(cableId);

      edit.updateDecoration('cables', cableId, {
        points,
      });
    } else {
      block = this.factoryService.create(
        edit,
        'cable-1',
        { parentConnection: { block: buildingBlock.id } },
        {
          cables: {
            points,
          },
        },
      );
    }

    points.forEach((point) => {
      const blockId = point.blockId || '';
      edit.updateBlock(blockId, { conduitConnections: [{ block: block.id }] });
    });

    edit.updateBlock(buildingBlock.id, { conduitConnections: [{ block: block?.id || '' }] });

    edit.commit();
  }

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private updateService: TransactionService;
}

export default AddWirePoints;

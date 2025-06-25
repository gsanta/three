import BlockData from '../../models/block/BlockData';
import BlockPartLookupData from '../../models/block/part/BlockPartLookupData';
import Num3 from '../../models/math/Num3';
import MeshWrapper from '../../models/MeshWrapper';
import FactoryService from '../../services/factory/FactoryService';
import Edit from '../../services/transaction/Edit';
import TransactionService from '../../services/transaction/TransactionService';
import SceneStore from '../../ui/scene/SceneStore';
import EraseBlock from '../erase/EraseBlock';
import BlockStore from '../../stores/block/BlockStore';

type WireConfig = {
  isPreview?: boolean;
};

class MakeWireConnection {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.transactionService = transactionService;
    this.factoryService = factoryService;
    this.sceneStore = sceneStore;

    this.eraseBlock = new EraseBlock(blockStore, transactionService);
  }

  execute(
    join1: { pole: BlockData; partName: string; pinIndex: number },
    join2: { pole: BlockData; partName: string; pinIndex: number },
    wireConfig: WireConfig = { isPreview: false },
  ) {
    this.wireConfig = { ...this.wireConfig, ...wireConfig };

    let positions: Num3[] = [
      [0, 0, 0],
      [0, 0, 0],
    ];

    positions = this.getPositions(join1.pole, join2.pole, join1.partName, join2.partName);

    const edit = this.transactionService.getOrCreateActiveTransaction();

    this.factoryService.create(edit, 'cable-1', {
      block: {
        multiParentConnections: [{ block: join1.pole.id }, { block: join2.pole.id }],
        isDirty: true,
        isPreview: this.wireConfig.isPreview,
      },
      decorations: {
        cables: {
          end1: { partName: join1.partName, device: join1.pole.id, pinIndex: join1.pinIndex },
          end2: { partName: join2.partName, device: join2.pole.id, pinIndex: join2.pinIndex },
          points: [
            { position: positions[0], blockId: join1.pole.id },
            { position: positions[1], blockId: join2.pole.id },
          ],
        },
      },
    });

    const cable = edit.getLastBlock();

    this.updatePole(edit, cable, join1.pole, join1.partName, join1.pinIndex);
    this.updatePole(edit, cable, join2.pole, join2.partName, join2.pinIndex);

    this.wireId = cable.id;
  }

  undo() {
    if (!this.wireId) {
      return;
    }

    this.eraseBlock.erase([this.wireId]);
    this.wireId = undefined;
  }

  private updatePole(edit: Edit, cable: BlockData, pole: BlockData, partName: string, pinIndex: number) {
    edit.updateBlock(pole.id, {
      conduitConnections: [{ block: cable.id, pinIndex: pinIndex, thisPart: partName }],
      partDetails: {
        [partName]: {
          ...pole.partDetails[partName],
          isConnected: {
            ...(pole.partDetails[partName]?.isConnected || {}),
            [pinIndex]: true,
          },
        } as BlockPartLookupData,
      },
    });
  }

  private getPositions(pole1: BlockData, pole2: BlockData, partName1: string, partName2: string) {
    const mesh1 = this.sceneStore.getObj3d(pole1.id);
    const mesh2 = this.sceneStore.getObj3d(pole2.id);

    const pinName1 = partName1;
    const pinName2 = partName2;

    const pos1 = new MeshWrapper(mesh1).findByName(pinName1).getWorldPosition();
    const pos2 = new MeshWrapper(mesh2).findByName(pinName2).getWorldPosition();

    return [pos1.get(), pos2.get()];
  }

  private eraseBlock: EraseBlock;

  private wireId?: string;

  private factoryService: FactoryService;

  private sceneStore: SceneStore;

  private transactionService: TransactionService;

  private wireConfig: WireConfig = { isPreview: false };
}

export default MakeWireConnection;

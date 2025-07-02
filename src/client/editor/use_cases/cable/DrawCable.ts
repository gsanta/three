import { Vector3 } from 'three';
import BlockData from '../../models/block/BlockData';
import BlockPart from '../../models/block/part/BlockPart';
import Num3 from '../../models/math/Num3';
import MeshWrapper from '../../models/MeshWrapper';
import FactoryService from '../../services/factory/FactoryService';
import TransactionService from '../../services/transaction/TransactionService';
import BlockStore from '../../stores/block/BlockStore';
import SceneStore from '../../ui/scene/SceneStore';
import BlockPartLookupData from '../../models/block/part/BlockPartLookupData';
import Edit from '../../services/transaction/Edit';
import { BlockTypeName } from '../../models/block/BlockConstantData';
import Vector from '../../models/math/Vector';

export type DrawOrUpdateCableConfig = {
  isPreview: boolean;
};

const initialConfig: Pick<BlockData, 'isPreview'> = {
  isPreview: false,
};

class DrawCable {
  constructor(
    blockStore: BlockStore,
    factoryService: FactoryService,
    sceneStore: SceneStore,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.factoryService = factoryService;
    this.sceneStore = sceneStore;
    this.transactionService = transactionService;

    this.config = { ...initialConfig };
  }

  finalize() {
    this.cableId = undefined;
    this.config = { ...initialConfig };
  }

  getCableId() {
    return this.cableId;
  }

  draw(from: Num3, to: Num3, cableType: BlockTypeName) {
    this.cableType = cableType;

    const cable = this.cableId && this.blockStore.getBlock(this.cableId);

    const edit = this.transactionService.createTransaction();
    if (!cable) {
      const newCable = this.factoryService.create(edit, cableType, {
        block: {
          isPreview: this.config.isPreview,
          position: new Vector(from).add(new Vector(to)).divide(2).get(),
        },
        decorations: {
          cables: {
            points: [{ position: from }, { position: to }],
          },
        },
      });

      this.cableId = newCable.id;
    } else {
      edit.updateDecoration(
        'cables',
        cable.id,
        {
          points: [{ position: from }, { position: to }],
        },
        { arrayMergeStrategy: 'replace' },
      );

      edit.updateBlock(cable.id, this.config);
    }
    edit.commit();
  }

  finish(from: { part: BlockPart; pinIndex: number }, to: { part: BlockPart; pinIndex: number }) {
    this.joinPins(
      { pole: from.part.getBlock().getBlock(), partName: from.part.getPart().name, pinIndex: from.pinIndex },
      { pole: to.part.getBlock().getBlock(), partName: to.part.getPart().name, pinIndex: to.pinIndex },
    );
  }

  updateConfig(update: Pick<BlockData, 'isPreview'>) {
    this.config = { ...this.config, ...update };
  }

  cancel() {
    if (this.cableId) {
      const edit = this.transactionService.createTransaction();
      edit.remove(this.cableId);
      edit.commit();
      this.cableId = undefined;
    }
    this.finalize();
  }

  private joinPins(
    join1: { pole: BlockData; partName: string; pinIndex: number },
    join2: { pole: BlockData; partName: string; pinIndex: number },
  ) {
    let positions: Num3[] = [
      [0, 0, 0],
      [0, 0, 0],
    ];

    positions = this.getPositions(join1.pole, join2.pole, join1.partName, join2.partName);

    const edit = this.transactionService.getOrCreateActiveTransaction();

    this.factoryService.create(edit, this.cableType, {
      block: {
        multiParentConnections: [{ block: join1.pole.id }, { block: join2.pole.id }],
        isDirty: true,
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

    edit.commit();
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

    const pinMesh1 = new MeshWrapper(mesh1).findByNameOld(pinName1);
    const pinMesh2 = new MeshWrapper(mesh2).findByNameOld(pinName2);
    const pos1 = new Vector3();
    pinMesh1.getWorldPosition(pos1);
    const pos2 = new Vector3();
    pinMesh2.getWorldPosition(pos2);

    return [pos1.toArray(), pos2.toArray()];
  }

  private config: DrawOrUpdateCableConfig;

  private cableType: BlockTypeName = 'cable-1';

  private cableId?: string;

  private blockStore: BlockStore;

  private factoryService: FactoryService;

  private sceneStore: SceneStore;

  private transactionService: TransactionService;
}

export default DrawCable;

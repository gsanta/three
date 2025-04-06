import MeshUtils from '@/client/editor/utils/MeshUtils';
import { Vector3 } from 'three';
import Block from '@/client/editor/types/Block';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import TransactionService from '../../services/transaction/TransactionService';
import FactoryService from '../../services/factory/FactoryService';
import BlockStore from '../../stores/block/BlockStore';
import Num3 from '../../types/Num3';
import Edit from '../../services/transaction/Edit';

class JoinPoles {
  constructor(
    blockStore: BlockStore,
    scene: SceneStore,
    factory: FactoryService,
    transactionService: TransactionService,
  ) {
    this.blockStore = blockStore;
    this.factory = factory;
    this.scene = scene;
    this.transactionService = transactionService;
  }

  join(pole1: Block, pole2: Block, pairs: [string, string][]) {
    pairs.forEach(([partIndex1, partIndex2]) => this.joinPins(pole1, pole2, partIndex1, partIndex2));
  }

  private joinPins(pole1: Block, pole2: Block, partIndex1: string, partIndex2: string) {
    let positions: Num3[] = [
      [0, 0, 0],
      [0, 0, 0],
    ];

    let isDirty = false;

    if (this.scene.hasObj3d(pole1.id) && this.scene.hasObj3d(pole2.id)) {
      positions = this.getPositions(pole1, pole2, partIndex1, partIndex2);
    } else {
      isDirty = true;
    }

    const edit = this.transactionService.getOrCreateActiveTransaction();

    this.factory.create(edit, 'cable-1', {
      block: {
        conduitParentConnections: [{ block: pole1.id }, { block: pole2.id }],
        isDirty,
      },
      decorations: {
        cables: {
          end1: { pin: partIndex1, device: pole1.id },
          end2: { pin: partIndex2, device: pole2.id },
          points: [{ position: positions[0] }, { position: positions[1] }],
        },
      },
    });

    const cable = edit.getLastBlock();

    this.updatePole(edit, cable, pole1, partIndex1);
    this.updatePole(edit, cable, pole2, partIndex2);

    // edit.commit();
  }

  private updatePole(edit: Edit, cable: Block, pole: Block, partIndex: string) {
    const device = this.blockStore.getDecoration('devices', pole.id);

    edit.update<'devices'>(
      pole.id,
      {
        conduitConnections: [{ block: cable.id }],
      },
      'devices',
      {
        pins: {
          ...device.pins,
          [partIndex]: {
            wires: [cable.id],
            connectedDevices: [device.id],
          },
        },
      },
    );
  }

  private getPositions(pole1: Block, pole2: Block, partIndex1: string, partIndex2: string) {
    const mesh1 = this.scene.getObj3d(pole1.id);
    const mesh2 = this.scene.getObj3d(pole2.id);

    const pinName1 = partIndex1;
    const pinName2 = partIndex2;

    const pinMesh1 = MeshUtils.findByName(mesh1, pinName1);
    const pinMesh2 = MeshUtils.findByName(mesh2, pinName2);

    const pos1 = new Vector3();
    pinMesh1.getWorldPosition(pos1);
    const pos2 = new Vector3();
    pinMesh2.getWorldPosition(pos2);

    return [pos1.toArray(), pos2.toArray()];
  }

  private blockStore: BlockStore;

  private factory: FactoryService;

  private scene: SceneStore;

  private transactionService: TransactionService;
}

export default JoinPoles;

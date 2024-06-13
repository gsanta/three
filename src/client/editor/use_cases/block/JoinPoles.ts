import MeshUtils from '@/client/editor/utils/MeshUtils';
import { Vector3 } from 'three';
import Block from '@/client/editor/types/Block';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import TransactionService from '../../services/transaction/TransactionService';
import FactoryService from '../../services/factory/FactoryService';
import BlockStore from '../../stores/block/BlockStore';

class JoinPoles {
  constructor(blockStore: BlockStore, scene: SceneStore, factory: FactoryService, update: TransactionService) {
    this.blockStore = blockStore;
    this.factory = factory;
    this.scene = scene;
    this.update = update;
  }

  join(pole1: Block, pole2: Block, pairs: [string, string][]) {
    pairs.forEach(([pinName1, pinName2]) => this.joinPins(pole1, pole2, pinName1, pinName2));
  }

  private joinPins(poleBlock1: Block, poleBlock2: Block, pinName1: string, pinName2: string) {
    const mesh1 = this.scene.getObj3d(poleBlock1.id);
    const mesh2 = this.scene.getObj3d(poleBlock2.id);
    const pinMesh1 = MeshUtils.findByName(mesh1, pinName1);
    const pinMesh2 = MeshUtils.findByName(mesh2, pinName2);

    const pole1 = this.blockStore.getDecoration('devices', poleBlock1.id);
    const pole2 = this.blockStore.getDecoration('devices', poleBlock2.id);

    const pos1 = new Vector3();
    pinMesh1.getWorldPosition(pos1);
    const pos2 = new Vector3();
    pinMesh2.getWorldPosition(pos2);

    const edit = this.update.getTransaction();

    this.factory.create(
      edit,
      'cable-1',
      { dependsOn: [poleBlock1.id, poleBlock2.id] },
      {
        cables: {
          end1: { pin: pinName1, device: poleBlock1.id, point: pos1.toArray() },
          end2: { pin: pinName2, device: poleBlock2.id, point: pos2.toArray() },
        },
      },
    );

    const cable = edit.getLastBlock();

    edit.update<'devices'>(
      poleBlock1.id,
      {
        dependents: [cable.id],
      },
      'devices',
      {
        pins: {
          // TODO: merging should preserve existing pins
          ...pole1.pins,
          [pinName1]: {
            wires: [cable.id],
          },
        },
      },
    );

    edit.update<'devices'>(
      poleBlock2.id,
      {
        dependents: [cable.id],
      },
      'devices',
      {
        pins: {
          ...pole2.pins,
          [pinName2]: {
            wires: [cable.id],
          },
        },
      },
    );

    edit.commit();
  }

  private blockStore: BlockStore;

  private factory: FactoryService;

  private scene: SceneStore;

  private update: TransactionService;
}

export default JoinPoles;

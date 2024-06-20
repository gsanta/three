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
    pairs.forEach(([partIndex1, partIndex2]) => this.joinPins(pole1, pole2, partIndex1, partIndex2));
  }

  private joinPins(deviceBlock1: Block, deviceBlock2: Block, partIndex1: string, partIndex2: string) {
    const mesh1 = this.scene.getObj3d(deviceBlock1.id);
    const mesh2 = this.scene.getObj3d(deviceBlock2.id);

    const pinName1 = deviceBlock1.partDetails[partIndex1]?.name || '';
    const pinName2 = deviceBlock2.partDetails[partIndex2]?.name || '';

    const pinMesh1 = MeshUtils.findByName(mesh1, pinName1);
    const pinMesh2 = MeshUtils.findByName(mesh2, pinName2);

    const device1 = this.blockStore.getDecoration('devices', deviceBlock1.id);
    const device2 = this.blockStore.getDecoration('devices', deviceBlock2.id);

    const pos1 = new Vector3();
    pinMesh1.getWorldPosition(pos1);
    const pos2 = new Vector3();
    pinMesh2.getWorldPosition(pos2);

    const edit = this.update.getTransaction();

    this.factory.create(
      edit,
      'cable-1',
      { dependsOn: [deviceBlock1.id, deviceBlock2.id] },
      {
        cables: {
          end1: { pin: partIndex1, device: deviceBlock1.id, point: pos1.toArray() },
          end2: { pin: partIndex2, device: deviceBlock2.id, point: pos2.toArray() },
        },
      },
    );

    const cable = edit.getLastBlock();

    edit.update<'devices'>(
      deviceBlock1.id,
      {
        dependents: [cable.id],
      },
      'devices',
      {
        pins: {
          // TODO: merging should preserve existing pins
          ...device1.pins,
          [partIndex1]: {
            wires: [cable.id],
            connectedDevices: [device2.id],
          },
        },
      },
    );

    edit.update<'devices'>(
      deviceBlock2.id,
      {
        dependents: [cable.id],
      },
      'devices',
      {
        pins: {
          ...device2.pins,
          [partIndex2]: {
            wires: [cable.id],
            connectedDevices: [device1.id],
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

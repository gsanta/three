import MeshUtils from '@/client/editor/utils/MeshUtils';
import { Vector3 } from 'three';
import Block from '@/client/editor/types/Block';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import TransactionService from '../../services/update/TransactionService';
import Num3 from '@/client/editor/types/Num3';
import FactoryService from '../../services/factory/FactoryService';

class JoinPoles {
  constructor(scene: SceneStore, factory: FactoryService, update: TransactionService) {
    this.factory = factory;
    this.scene = scene;
    this.update = update;
  }

  join(pole1: Block, pole2: Block) {
    (['pin1', 'pin2', 'pin3'] as const).map((pinName) => this.joinPins(pole1, pole2, pinName));
  }

  private joinPins(pole1: Block, pole2: Block, pinName: 'pin1' | 'pin2' | 'pin3') {
    const mesh1 = this.scene.getObj3d(pole1.id);
    const mesh2 = this.scene.getObj3d(pole2.id);
    const pinMesh1 = MeshUtils.findByName(mesh1, pinName);
    const pinMesh2 = MeshUtils.findByName(mesh2, pinName);

    const pos1 = new Vector3();
    pinMesh1.getWorldPosition(pos1);
    const pos2 = new Vector3();
    pinMesh2.getWorldPosition(pos2);

    const edit = this.update.getUpdate();

    this.factory.create(
      edit,
      'cable-1',
      { dependsOn: [pole1.id, pole2.id] },
      {
        cables: {
          points: [pos1, pos2].map((point) => [point.x, point.y, point.z]) as Num3[],
          end1: { pin: pinName, device: pole1.id },
          end2: { pin: pinName, device: pole2.id },
        },
      },
    );

    const cable = edit.getLastBlock();

    edit.update<'poles'>(
      pole1.id,
      {
        dependents: [cable.id],
      },
      {
        pins: { [pinName]: [cable.id] },
      },
    );

    edit.update<'poles'>(
      pole2.id,
      {
        dependents: [cable.id],
      },
      {
        pins: { [pinName]: [cable.id] },
      },
    );

    edit.commit();
  }

  private factory: FactoryService;

  private scene: SceneStore;

  private update: TransactionService;
}

export default JoinPoles;

import MeshUtils from '@/editor/utils/MeshUtils';
import { Vector3 } from 'three';
import Block from '@/editor/types/Block';
import SceneService from '@/editor/services/scene/SceneService';
import UpdateService from '../UpdateService';
import Num3 from '@/editor/types/Num3';

class JoinPoles {
  constructor(scene: SceneService, update: UpdateService) {
    this.scene = scene;
    this.update = update;
  }

  join(pole1: Block, pole2: Block) {
    (['pin1', 'pin2', 'pin3'] as const).map((pinName) => this.joinPins(pole1, pole2, pinName));
  }

  private joinPins(pole1: Block, pole2: Block, pinName: 'pin1' | 'pin2' | 'pin3') {
    const mesh1 = this.scene.getMesh(pole1.id);
    const mesh2 = this.scene.getMesh(pole2.id);
    const pinMesh1 = MeshUtils.findByName(mesh1, pinName);
    const pinMesh2 = MeshUtils.findByName(mesh2, pinName);

    const pos1 = new Vector3();
    pinMesh1.getWorldPosition(pos1);
    const pos2 = new Vector3();
    pinMesh2.getWorldPosition(pos2);

    const edit = this.update
      .getUpdate()
      .create<'cables'>(
        'cable',
        { dependsOn: [pole1.id, pole2.id] },
        { points: [pos1, pos2].map((point) => [point.x, point.y, point.z]) as Num3[] },
      );

    const cable = edit.getLastBlock();

    edit.update<'poles'>(
      pole1.id,
      {
        dependents: [cable.id],
      },
      {
        pins: { [pinName]: cable.id },
      },
    );

    edit.update<'poles'>(
      pole2.id,
      {
        dependents: [cable.id],
      },
      {
        pins: { [pinName]: cable.id },
      },
    );

    edit.execute();
  }

  private scene: SceneService;

  private update: UpdateService;
}

export default JoinPoles;

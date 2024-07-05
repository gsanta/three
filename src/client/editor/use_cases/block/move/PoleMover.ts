import Num3 from '@/client/editor/types/Num3';
import BlockMover from './BlockMover';
import Block from '@/client/editor/types/Block';
import Edit from '../../../services/update/Edit';
import SceneStore from '../../../components/scene/SceneStore';
import BlockStore from '../../../stores/block/BlockStore';
import { addVector } from '@/client/editor/utils/vectorUtils';

class PoleMover extends BlockMover {
  constructor(store: BlockStore, scene: SceneStore) {
    super('poles');
    this.scene = scene;
    this.store = store;
  }

  move(edit: Edit, pole: Block, dragDelta: Num3) {
    const decoration = this.store.getDecoration('devices', pole.id);

    Object.keys(decoration.pins).forEach((key) => {
      const cables = decoration.pins[key];
      cables?.wires.forEach((cable) => {
        this.moveCable(edit, cable, pole, dragDelta);
      });
    });
  }

  private moveCable(edit: Edit, cableId: string, pole: Block, dragDelta: Num3) {
    const cable = this.store.getDecoration('cables', cableId);

    const index = cable.end1?.device === pole.id ? 0 : cable.points.length - 1;
    const newPoints = [...cable.points];

    const newPoint = { position: addVector(newPoints[index].position, dragDelta) };

    newPoints.splice(index, 1, newPoint);

    // const pole1Id = cable.end1?.device;
    // const pin1Index = cable.end1?.pin;
    // const pole2Id = cable.end2?.device;
    // const pin2Index = cable.end2?.pin;

    // const pole1Mesh = this.scene.getObj3d(pole1Id || '');
    // const pin1Mesh = MeshUtils.findByName(pole1Mesh, pin1Index || '');

    // const pole2Mesh = this.scene.getObj3d(pole2Id || '');
    // const pin2Mesh = MeshUtils.findByName(pole2Mesh, pin2Index);

    // const vec = new Vector3();
    // pin1Mesh.getWorldPosition(vec);

    // const vec2 = new Vector3();
    // pin2Mesh.getWorldPosition(vec2);

    edit.updateDecoration(
      'cables',
      cableId,
      {
        points: newPoints,
      },
      { arrayMergeStrategy: 'replace' },
    );
  }

  private store: BlockStore;

  private scene: SceneStore;
}

export default PoleMover;

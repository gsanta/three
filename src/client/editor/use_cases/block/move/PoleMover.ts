import BlockMover from './BlockMover';
import Block from '@/client/editor/types/Block';
import Edit from '../../../services/update/Edit';
import SceneStore from '../../../components/scene/SceneStore';
import BlockStore from '../../../stores/block/BlockStore';
import Cable from '@/client/editor/types/block/Cable';
import MeshUtils from '@/client/editor/utils/MeshUtils';
import { Vector3 } from 'three';

class PoleMover extends BlockMover {
  constructor(store: BlockStore, scene: SceneStore) {
    super('poles');
    this.scene = scene;
    this.store = store;
  }

  move(edit: Edit, pole: Block) {
    const decoration = this.store.getDecoration('devices', pole.id);

    Object.keys(decoration.pins).forEach((key) => {
      const cables = decoration.pins[key];
      cables?.wires.forEach((cable) => {
        this.moveCable(edit, cable, pole);
      });
    });
  }

  private moveCable(edit: Edit, cableId: string, pole: Block) {
    const cable = this.store.getDecoration('cables', cableId) as Cable;

    let index = 0;
    let cableEnd = cable.end1;
    if (cable.end2?.device === pole.id) {
      index = 1;
      cableEnd = cable.end2;
    }

    if (!cableEnd?.pin) {
      return;
    }

    const poleMesh = this.scene.getObj3d(pole.id);
    const partName = pole.partDetails[cableEnd?.pin]?.name;
    const mesh = MeshUtils.findByName(poleMesh, partName);

    const pos = new Vector3();
    mesh.getWorldPosition(pos);

    const newPoints = [...cable.points];

    const newPoint = { position: pos.toArray() };

    newPoints.splice(index, 1, newPoint);

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

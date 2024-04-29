import { Pins, maxPolePinNumber } from '@/client/editor/features/block/types/Pole';
import Num3 from '@/client/editor/types/Num3';
import BlockMover from './BlockMover';
import Block from '@/client/editor/types/Block';
import Edit from '../../services/update/Edit';
import SceneStore from '../../../scene/SceneStore';
import MeshUtils from '@/client/editor/utils/MeshUtils';
import { Vector3 } from 'three';
import BlockStore from '../../BlockStore';

class PoleMover extends BlockMover {
  constructor(store: BlockStore, scene: SceneStore) {
    super('poles');
    this.scene = scene;
    this.store = store;
  }

  move(edit: Edit, pole: Block) {
    const decoration = this.store.getDecoration(pole.category as 'poles', pole.id);

    for (let i = 1; i <= maxPolePinNumber; i++) {
      const cables = decoration.pins[`pin${i}` as Pins];
      cables.forEach((cable) => {
        this.moveCable(edit, cable, `pin${i}`);
      });
    }
  }

  private moveCable(edit: Edit, cableId: string, pinName: string) {
    const cable = this.store.getBlocks()[cableId];

    const poles = cable.dependsOn
      .filter((id) => this.store.getBlocks()[id].category === 'poles')
      .map((id) => this.store.getBlocks()[id]);

    const pole1Mesh = this.scene.getObj3d(poles[0].id);
    const pin1Mesh = MeshUtils.findByName(pole1Mesh, pinName);

    const pole2Mesh = this.scene.getObj3d(poles[1].id);
    const pin2Mesh = MeshUtils.findByName(pole2Mesh, pinName);

    const vec = new Vector3();
    pin1Mesh.getWorldPosition(vec);

    const vec2 = new Vector3();
    pin2Mesh.getWorldPosition(vec2);

    const newPoints = [[vec.x, vec.y, vec.z] as Num3, [vec2.x, vec2.y, vec2.z] as Num3];

    edit.updateDecoration('cables', cableId, {
      points: newPoints,
    });
  }

  private store: BlockStore;

  private scene: SceneStore;
}

export default PoleMover;

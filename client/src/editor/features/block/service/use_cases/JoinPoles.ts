import MeshUtils from '@/editor/utils/MeshUtils';
import { Vector3 } from 'three';
import { Store } from '@/common/utils/store';
import Block from '@/editor/types/Block';
import SceneService from '@/editor/services/scene/SceneService';
import BlockService from '../BlockService';
import Num3 from '@/editor/types/Num3';

class JoinPoles {
  constructor(store: Store, scene: SceneService, blockService: BlockService) {
    this.store = store;
    this.scene = scene;
    this.blockService = blockService;
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

    const cable = this.blockService.create<'cables'>(
      'cable',
      { dependsOn: [pole1.id, pole2.id] },
      { points: [pos1, pos2].map((point) => [point.x, point.y, point.z]) as Num3[] },
    );

    const newPole1 = this.blockService.updateBlock(pole1.id, {
      dependents: [cable.block.id],
    });

    const newPole2 = this.blockService.updateBlock(pole2.id, {
      dependents: [cable.block.id],
    });

    const newPoleAssociation1 = this.blockService.updateAssociation('poles', pole1.id, {
      pins: { [pinName]: cable.block.id },
    });
    const newPoleAssociation2 = this.blockService.updateAssociation('poles', pole2.id, {
      pins: { [pinName]: cable.block.id },
    });

    this.blockService.executeUpdate([
      { block: newPole1, category: 'poles', decoration: newPoleAssociation1 },
      { block: newPole2, category: 'poles', decoration: newPoleAssociation2 },
      cable,
    ]);
  }

  private store: Store;

  private scene: SceneService;

  private blockService: BlockService;
}

export default JoinPoles;

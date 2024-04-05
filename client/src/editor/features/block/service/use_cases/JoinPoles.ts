import MeshUtils from '@/editor/utils/MeshUtils';
import { Vector3 } from 'three';
import { getBlock } from '../../utils/blockUtils';
import MeshCreator from '../MeshCreator';
import { Store } from '@/common/utils/store';
import { addMeshes } from '@/editor/services/scene/sceneSlice';
import MeshData from '@/editor/types/MeshData';
import SceneService from '@/editor/services/scene/SceneService';
import UpdateService from '../UpdateService';

class JoinPoles {
  constructor(store: Store, scene: SceneService, updater: UpdateService) {
    this.store = store;
    this.scene = scene;
    this.updater = updater;
  }

  join(pole1: MeshData, pole2: MeshData) {
    (['pin1', 'pin2', 'pin3'] as const).map((pinName) => this.joinPins(pole1, pole2, pinName));
  }

  private joinPins(pole1: MeshData, pole2: MeshData, pinName: 'pin1' | 'pin2' | 'pin3') {
    const mesh1 = this.scene.getMesh(pole1.id);
    const mesh2 = this.scene.getMesh(pole2.id);
    const pinMesh1 = MeshUtils.findByName(mesh1, pinName);
    const pinMesh2 = MeshUtils.findByName(mesh2, pinName);

    const pos1 = new Vector3();
    pinMesh1.getWorldPosition(pos1);
    const pos2 = new Vector3();
    pinMesh2.getWorldPosition(pos2);

    const cable = this.createMesh([pos1, pos2]);

    this.store.dispatch(addMeshes([cable]));

    this.updater.updateSpecific('poles', pole1.id, { pins: { [pinName]: cable.id } });
    this.updater.updateSpecific('poles', pole2.id, { pins: { [pinName]: cable.id } });
  }

  private createMesh(points: Vector3[]) {
    const { blocks } = this.store.getState().block.present;
    const cableBlock = getBlock(blocks, 'cable');

    return MeshCreator.create(cableBlock, { points: points.map((point) => [point.x, point.y, point.z]) });
  }

  private store: Store;

  private scene: SceneService;

  private updater: UpdateService;
}

export default JoinPoles;

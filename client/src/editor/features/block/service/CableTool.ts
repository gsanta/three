import { Store } from '@/common/utils/store';
import { addMeshes, setSelectedMeshes, updateMesh } from '@/editor/services/scene/sceneSlice';
import Tool, { ToolInfo } from '@/editor/services/tool/service/Tool';
import ToolName from '@/editor/services/tool/state/ToolName';
import MeshCreator from './MeshCreator';
import { getBlock } from '../utils/blockUtils';
import SceneService from '@/editor/services/scene/SceneService';
import Intersect from './Intersect';
import MeshData from '@/editor/types/MeshData';
import { Vector3 } from 'three';
import JoinPoles from './use_cases/JoinPoles';

class CableTool extends Tool {
  constructor(store: Store, scene: SceneService) {
    super(store, ToolName.Cable);

    this.scene = scene;
  }

  onPointerDown({ eventObjectName, clientX, clientY }: ToolInfo) {
    const { meshes, selectedMeshIds } = this.store.getState().scene.present;
    const canvasElement = this.scene.getCanvasElement();
    const camera = this.scene.getCamera();
    const mesh = this.scene.getMesh(eventObjectName);

    if (!mesh) {
      return;
    }

    const intersect = new Intersect(canvasElement, camera);

    const [intersection] = intersect.calculate(mesh, clientX, clientY);

    if (!intersection) {
      return;
    }

    const point = intersection.point;
    const cable = selectedMeshIds.find((root) => meshes[root].name === 'cable');

    if (!cable) {
      this.createMesh([point]);
    } else {
      this.updateMesh(cable, point);
    }
  }

  joinPoles() {
    const { meshes } = this.store.getState().scene.present;

    const poles = Object.values(meshes).filter((mesh) => mesh.name === 'pole');

    if (poles.length < 2) {
      return;
    }

    const joinPoles = new JoinPoles(this.store, this.scene);

    joinPoles.join(poles[0], poles[1]);

    // this.store.dispatch(updateSpecific({ id: '123', key: 'poles', val: { count: 12 } }));
  }

  private createMesh(points: Vector3[]) {
    const { blocks } = this.store.getState().block.present;
    const cableBlock = getBlock(blocks, 'cable');

    const newMesh = MeshCreator.create(cableBlock, { points: points.map((point) => [point.x, point.y, point.z]) });
    this.store.dispatch(addMeshes([newMesh]));
    this.store.dispatch(setSelectedMeshes([newMesh.id]));
  }

  private updateMesh(meshId: string, point: Vector3) {
    const { meshes } = this.store.getState().scene.present;

    const newMesh: MeshData = {
      ...meshes[meshId],
      name: 'cable',
      points: [...meshes[meshId].points, [point.x, point.y, point.z]],
    };

    this.store.dispatch(updateMesh(newMesh));
  }

  private scene: SceneService;
}

export default CableTool;

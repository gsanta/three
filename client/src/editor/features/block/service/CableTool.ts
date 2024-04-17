import { Store } from '@/common/utils/store';
import { setSelectedBlocks } from '@/editor/services/scene/blocksSlice';
import Tool, { ToolInfo } from '@/editor/services/tool/service/Tool';
import ToolName from '@/editor/services/tool/state/ToolName';
import SceneService from '@/editor/services/scene/SceneService';
import Intersect from './Intersect';
import { Vector3 } from 'three';
import JoinPoles from './use_cases/JoinPoles';
import BlockService from './BlockService';
import Num3 from '@/editor/types/Num3';

class CableTool extends Tool {
  constructor(store: Store, scene: SceneService, blockService: BlockService) {
    super(store, ToolName.Cable);

    this.scene = scene;
    this.blockService = blockService;
  }

  onPointerDown({ eventObjectName, clientX, clientY }: ToolInfo) {
    const { blocks: meshes, selectedBlockIds: selectedMeshIds } = this.store.getState().blocks.present;
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
      this.createBlock([point]);
    } else {
      this.updateBlock(cable, point);
    }
  }

  joinPoles() {
    const { blocks: meshes } = this.store.getState().blocks.present;

    const poles = Object.values(meshes).filter((mesh) => mesh.name === 'pole');

    if (poles.length < 2) {
      return;
    }

    const joinPoles = new JoinPoles(this.store, this.scene, this.blockService);

    joinPoles.join(poles[0], poles[1]);
  }

  private createBlock(points: Vector3[]) {
    const update = this.blockService.create<'cables'>(
      'cable',
      { dependsOn: [] },
      { points: points.map((point) => [point.x, point.y, point.z]) as Num3[] },
    );

    this.blockService.executeUpdate([update]);
    this.store.dispatch(setSelectedBlocks([update.block.id]));
  }

  private updateBlock(meshId: string, point: Vector3) {
    const update = this.blockService.updateAssociation<'cables'>('cables', meshId, {
      points: [[point.x, point.y, point.z]],
    });

    this.blockService.executeUpdate([{ category: 'cables', decoration: update }]);
  }

  private scene: SceneService;

  private blockService: BlockService;
}

export default CableTool;

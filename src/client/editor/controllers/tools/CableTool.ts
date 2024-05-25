import Tool from '@/client/editor/types/Tool';
import ToolName from '@/client/editor/types/ToolName';
import SceneStore from '@/client/editor/components/scene/SceneStore';
import { Vector3 } from 'three';
import JoinPoles from '../../use_cases/block/JoinPoles';
import UpdateService from '../../services/update/UpdateService';
import Num3 from '@/client/editor/types/Num3';
import BlockStore from '../../stores/block/BlockStore';

class CableTool extends Tool {
  constructor(store: BlockStore, scene: SceneStore, update: UpdateService) {
    super(store, update, ToolName.Cable);

    this.scene = scene;
    this.updateService = update;
  }

  // onPointerDown({ eventObject, clientX, clientY }: ToolInfo) {
  //   const blocks = this.store.getBlocks();
  //   const selectedBlockIds = this.store.getSelectedRootBlockIds();
  //   const canvasElement = this.scene.getCanvasElement();
  //   const camera = this.scene.getCamera();
  //   const mesh = this.scene.getMesh(eventObject?.userData.modelId || '');

  //   if (!mesh) {
  //     return;
  //   }

  //   const intersect = new IntersectMesh(canvasElement, camera);

  //   const intersection = intersect.calculate(mesh, clientX, clientY);

  //   if (!intersection) {
  //     return;
  //   }

  //   const point = intersection.point;
  //   const cable = selectedBlockIds.find((root) => blocks[root].name === 'cable');

  //   if (!cable) {
  //     this.createBlock([point]);
  //   } else {
  //     this.updateBlock(cable, point);
  //   }
  // }

  onExecute() {
    console.log('on execute');
    const blocks = this.store.getBlocks();
    const selectedBlockIds = this.store.getSelectedRootBlockIds();

    const polesIds = selectedBlockIds.filter((id) => blocks[id].category === 'poles');

    console.log('selected ids: ' + blocks[selectedBlockIds[0]].category);

    if (polesIds.length < 2) {
      return;
    }

    const joinPoles = new JoinPoles(this.scene, this.updateService);

    joinPoles.join(blocks[polesIds[0]], blocks[polesIds[1]]);
  }

  private createBlock(points: Vector3[]) {
    this.updateService
      .getUpdate()
      .create<'cables'>(
        'cable',
        { dependsOn: [] },
        { points: points.map((point) => [point.x, point.y, point.z]) as Num3[] },
      )
      .commit();
  }

  private updateBlock(meshId: string, point: Vector3) {
    this.updateService
      .getUpdate()
      .updateDecoration<'cables'>('cables', meshId, {
        points: [[point.x, point.y, point.z]],
      })
      .commit();
    // const update = this.updateService.updateAssociation<'cables'>('cables', meshId, {
    //   points: [[point.x, point.y, point.z]],
    // });

    // this.updateService.executeUpdate([{ category: 'cables', decoration: update }]);
  }

  private scene: SceneStore;

  private updateService: UpdateService;
}

export default CableTool;

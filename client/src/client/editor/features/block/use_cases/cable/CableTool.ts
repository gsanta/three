import Tool, { ToolInfo } from '@/client/editor/features/tool/service/Tool';
import ToolName from '@/client/editor/features/tool/state/ToolName';
import SceneStore from '@/client/editor/features/scene/SceneStore';
import Intersect from '../Intersect';
import { Vector3 } from 'three';
import JoinPoles from './JoinPoles';
import UpdateService from '../../services/update/UpdateService';
import Num3 from '@/client/editor/types/Num3';
import BlockStore from '../../BlockStore';

class CableTool extends Tool {
  constructor(store: BlockStore, scene: SceneStore, update: UpdateService) {
    super(store, update, ToolName.Cable);

    this.scene = scene;
    this.updateService = update;
  }

  onPointerDown({ eventObjectName, clientX, clientY }: ToolInfo) {
    const blocks = this.store.getBlocks();
    const selectedBlockIds = this.store.getSelectedBlockIds();
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
    const cable = selectedBlockIds.find((root) => blocks[root].name === 'cable');

    if (!cable) {
      this.createBlock([point]);
    } else {
      this.updateBlock(cable, point);
    }
  }

  joinPoles() {
    const blocks = this.store.getBlocks();
    const selectedBlockIds = this.store.getSelectedBlockIds();

    const polesIds = selectedBlockIds.filter((id) => blocks[id].category === 'poles');

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

    // const update = this.updateService.create<'cables'>(
    //   'cable',
    //   { dependsOn: [] },
    //   { points: points.map((point) => [point.x, point.y, point.z]) as Num3[] },
    // );

    // this.updateService.executeUpdate([update]);
    // this.store.dispatch(setSelectedBlocks([update.block.id]));
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

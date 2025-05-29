import { ThreeEvent } from '@react-three/fiber';
import { Object3D, Vector3 } from 'three';
import TestStore from './TestStore';
import ToolService, { ScenePointerEvent } from '@/client/editor/services/ToolService';
import SceneStore from '@/client/editor/ui/scene/SceneStore';
import GridStore from '@/client/editor/stores/grid/GridStore';
import Grid from '@/client/editor/models/Grid';
import Vector from '@/client/editor/models/math/Vector';
import BlockStore from '@/client/editor/stores/block/BlockStore';

class ToolHelper {
  constructor(
    blockStore: BlockStore,
    gridStore: GridStore,
    sceneStore: SceneStore,
    tool: ToolService,
    testScene: TestStore,
  ) {
    this.blockStore = blockStore;
    this.gridStore = gridStore;
    this.tool = tool;
    this.testScene = testScene;
    this.sceneStore = sceneStore;
  }

  pointerEnter({ blockId, partIndex }: { blockId?: string; partIndex?: string }) {
    this.tool.onPointerEnter(
      {
        eventObject: this.getEventObject(blockId),
      } as ThreeEvent<PointerEvent>,
      partIndex,
    );
  }

  pointerMove({ blockId, point }: { blockId?: string; point?: Vector3 } = {}) {
    if (!point) {
      return;
    }

    const grid = new Grid(this.gridStore);
    const gridIndex = grid.worldToGridIndex(new Vector(point?.toArray()));
    const [gridX, gridY] = grid.gridIndexToGridPos(gridIndex);

    this.tool.onPointerMove({
      point,
      clientX: 0,
      clientY: 0,
      gridX,
      gridY,
      gridIndex,
      eventObject: this.getEventObject(blockId),
    } as ScenePointerEvent);
  }

  pointerDown({ blockId }: { blockId?: string } = {}) {
    this.tool.onPointerDown({
      point: this.tool.getToolInfo().pos,
      clientX: 0,
      clientY: 0,
      eventObject: this.getEventObject(blockId),
    } as ThreeEvent<PointerEvent>);
  }

  pointerUp() {
    this.tool.onPointerUp();
  }

  private getEventObject(blockId?: string) {
    let eventObj = this.testScene.getPlane() as Object3D;

    const hovered = this.blockStore.getHovered();

    if (blockId) {
      eventObj = this.sceneStore.getObj3d(blockId);
    } else if (hovered?.block) {
      eventObj = this.sceneStore.getObj3d(hovered.block);
    }

    return eventObj;
  }

  private blockStore: BlockStore;

  private gridStore: GridStore;

  private sceneStore: SceneStore;

  private tool: ToolService;

  private testScene: TestStore;
}

export default ToolHelper;

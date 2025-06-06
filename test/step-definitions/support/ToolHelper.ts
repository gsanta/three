import { ThreeEvent } from '@react-three/fiber';
import { Object3D, Vector3 } from 'three';
import TestStore from './TestStore';
import ToolService from '@/client/editor/services/ToolService';
import SceneStore from '@/client/editor/ui/scene/SceneStore';

class ToolHelper {
  constructor(sceneStore: SceneStore, tool: ToolService, testScene: TestStore) {
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
    this.tool.onPointerMove({
      point,
      clientX: 0,
      clientY: 0,
      eventObject: this.getEventObject(blockId),
    } as ThreeEvent<PointerEvent>);
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

    if (blockId) {
      eventObj = this.sceneStore.getObj3d(blockId);
    }

    return eventObj;
  }

  private sceneStore: SceneStore;

  private tool: ToolService;

  private testScene: TestStore;
}

export default ToolHelper;

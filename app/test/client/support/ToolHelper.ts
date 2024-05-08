import { ThreeEvent } from '@react-three/fiber';
import { Object3D, Vector3 } from 'three';
import TestStore from './TestStore';
import ToolService from '@/client/editor/features/tool/service/ToolService';

class ToolHelper {
  constructor(tool: ToolService, testScene: TestStore) {
    this.tool = tool;
    this.testScene = testScene;
  }

  pointerMove(point: Vector3) {
    this.tool.onPointerMove({
      point,
      clientX: 0,
      clientY: 0,
    } as ThreeEvent<PointerEvent>);
  }

  pointerDown({ eventObject, eventObjectName }: { eventObject?: Object3D; eventObjectName?: string } = {}) {
    let eventObj = this.testScene.getPlane() as Object3D;
    if (eventObject) {
      eventObj = eventObject;
    } else if (eventObjectName) {
      eventObj = {
        userData: {
          modelId: eventObjectName,
        },
      } as unknown as Object3D;
    }

    this.tool.onPointerDown({
      point: this.tool.getToolInfo().pos,
      clientX: 0,
      clientY: 0,
      eventObject: eventObj,
    } as ThreeEvent<PointerEvent>);
  }

  private tool: ToolService;

  private testScene: TestStore;
}

export default ToolHelper;

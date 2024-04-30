import { EditorContextType } from '@/app/editor/EditorContext';
import { ThreeEvent } from '@react-three/fiber';
import { Object3D, Vector3 } from 'three';
import TestScene from './TestScene';

class ToolHelper {
  constructor(context: EditorContextType, testScene: TestScene) {
    this.context = context;
    this.testScene = testScene;
  }

  pointerMove(point: Vector3) {
    this.context.tool.onPointerMove({
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

    this.context.tool.onPointerDown({
      point: this.context.tool.getToolInfo().pos,
      clientX: 0,
      clientY: 0,
      eventObject: eventObj,
    } as ThreeEvent<PointerEvent>);
  }

  private context: EditorContextType;

  private testScene: TestScene;
}

export default ToolHelper;

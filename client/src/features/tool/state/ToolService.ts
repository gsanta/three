import { ThreeEvent } from '@react-three/fiber';
import Tool from './Tool';
import ToolName from './ToolName';
import { Store } from '@/common/utils/store';
import { setPointer } from './toolSlice';

class ToolService {
  constructor(tools: Tool[], store: Store) {
    this.tools = tools;
    this.store = store;
  }

  onPointerDown(event: ThreeEvent<PointerEvent>) {
    this.store.dispatch(
      setPointer({ eventObjectName: event.eventObject.name, x: event.point.x, y: event.point.y, z: event.point.z }),
    );

    const { selectedTool, pointer } = this.store.getState().tool;
    this.getTool(selectedTool)?.onPointerDown(pointer);
  }

  onPointerMove(event: ThreeEvent<PointerEvent>) {
    this.store.dispatch(setPointer({ x: event.point.x, y: event.point.y, z: event.point.z }));

    const { selectedTool, pointer } = this.store.getState().tool;
    this.getTool(selectedTool)?.onPointerMove(pointer);
  }

  getTools(): Tool[] {
    return this.tools;
  }

  getTool(name: ToolName) {
    return this.tools.find((tool) => tool.name === name);
  }

  private tools: Tool[];

  private store: Store;
}

export default ToolService;

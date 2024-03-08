import { ThreeEvent } from '@react-three/fiber';
import Tool, { PointerInfo } from './Tool';
import ToolName from './ToolName';
import { Store } from '@/common/utils/store';
import { Vector3 } from 'three';
import SelectTool from '@/editor/features/builder/SelectTool';
import AddTool from '../../builder/AddTool';

class ToolService {
  constructor(tools: Tool[], store: Store) {
    this.tools = tools;
    this.store = store;
    this.pointer = {
      pos: new Vector3(),
      drag: [0, 0, 0],
      eventObjectName: '',
    };
  }

  onPointerDown(event: ThreeEvent<PointerEvent>) {
    this.pointer.eventObjectName = event.eventObject.name;

    const { selectedTool } = this.store.getState().tool;
    this.getTool(selectedTool)?.onPointerDown(this.pointer);
  }

  onPointerMove(event: ThreeEvent<PointerEvent>) {
    this.pointer.pos = event.point;

    const { selectedTool } = this.store.getState().tool;
    this.getTool(selectedTool)?.onPointerMove(this.pointer);
  }

  onDrag(position: Vector3) {
    this.pointer.drag = position.toArray();

    const { selectedTool } = this.store.getState().tool;
    this.getTool(selectedTool)?.onDrag(this.pointer);
  }

  onDragEnd(delta: Vector3) {
    this.pointer.drag = delta.toArray();

    const { selectedTool } = this.store.getState().tool;
    this.getTool(selectedTool)?.onDragEnd(this.pointer);
    this.pointer.drag = [0, 0, 0];
  }

  getTools(): Tool[] {
    return this.tools;
  }

  getTool(name: ToolName) {
    return this.tools.find((tool) => tool.name === name);
  }

  getSelectTool() {
    return this.tools.find((tool) => tool.name === ToolName.Select) as SelectTool;
  }

  getAddTool() {
    return this.tools.find((tool) => tool.name === ToolName.Add) as AddTool;
  }

  private pointer: PointerInfo;

  private tools: Tool[];

  private store: Store;
}

export default ToolService;

import { ThreeEvent } from '@react-three/fiber';
import Tool, { ToolInfo } from './Tool';
import ToolName from './ToolName';
import { Store } from '@/common/utils/store';
import { Mesh, Vector3 } from 'three';
import SelectTool from '@/editor/features/builder/SelectTool';
import AddTool from '../../builder/AddTool';
import GroupTool from '../../builder/GroupTool';

class ToolService {
  constructor(tools: Tool[], store: Store) {
    this.tools = tools;
    this.store = store;
    this.info = {
      pos: new Vector3(),
      drag: [0, 0, 0],
      eventObjectName: '',
    };
  }

  onPointerDown(event: ThreeEvent<PointerEvent>) {
    this.info.eventObjectName = event.eventObject.name;

    const { selectedTool } = this.store.getState().tool;
    this.getTool(selectedTool)?.onPointerDown(this.info);
  }

  onPointerMove(event: ThreeEvent<PointerEvent>) {
    this.info.pos = event.point;

    const { selectedTool } = this.store.getState().tool;
    this.getTool(selectedTool)?.onPointerMove(this.info);
  }

  onDrag(position: Vector3) {
    this.info.drag = position.toArray();

    const { selectedTool } = this.store.getState().tool;
    this.getTool(selectedTool)?.onDrag(this.info);
  }

  onDragEnd(delta: Vector3) {
    this.info.drag = delta.toArray();

    const { selectedTool } = this.store.getState().tool;
    this.getTool(selectedTool)?.onDragEnd(this.info);
    this.info.drag = [0, 0, 0];
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

  getJoinTool() {
    return this.tools.find((tool) => tool.name === ToolName.Join) as GroupTool;
  }

  getToolInfo(): ToolInfo {
    return this.info;
  }

  setSelectedMesh(mesh?: Mesh) {
    this.info.selectedMesh = mesh;
  }

  private info: ToolInfo;

  private tools: Tool[];

  private store: Store;

  private mesh: Mesh | undefined;
}

export default ToolService;

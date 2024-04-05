import { ThreeEvent } from '@react-three/fiber';
import Tool, { ToolInfo } from './Tool';
import ToolName from '../state/ToolName';
import { Store } from '@/common/utils/store';
import { Mesh, Vector3 } from 'three';
import SelectTool from '@/editor/features/block/service/SelectTool';
import AddTool from '../../../features/block/service/AddTool';
import GroupTool from '@/editor/features/block/service/GroupTool';
import CableTool from '@/editor/features/block/service/CableTool';
import MeshData from '@/editor/types/MeshData';

class ToolService {
  constructor(tools: Tool[], store: Store) {
    this.tools = tools;
    this.store = store;
    this.info = {
      pos: new Vector3(),
      drag: [0, 0, 0],
      eventObjectName: '',
      clientX: 0,
      clientY: 0,
    };
  }

  onPointerDown(event: ThreeEvent<PointerEvent>) {
    this.info.pos = event.point;
    this.info.clientX = event.clientX;
    this.info.clientY = event.clientY;
    this.info.eventObjectName = event.eventObject.userData.modelId;

    const { selectedTool } = this.store.getState().tool;
    this.getTool(selectedTool)?.onPointerDown(this.info);
  }

  onPointerMove(event: ThreeEvent<PointerEvent>) {
    this.info.pos = event.point;
    this.info.clientX = event.clientX;
    this.info.clientY = event.clientY;

    const { selectedTool } = this.store.getState().tool;
    this.getTool(selectedTool)?.onPointerMove(this.info);
  }

  onDrag(mesh: MeshData) {
    this.info.draggedMesh = mesh;

    const { selectedTool } = this.store.getState().tool;
    this.getTool(selectedTool)?.onDrag(this.info);
  }

  onDragEnd(delta: Vector3) {
    this.info.drag = delta.toArray();

    const { selectedTool } = this.store.getState().tool;
    this.getTool(selectedTool)?.onDragEnd(this.info);
    this.info.drag = [0, 0, 0];
    this.info.draggedMesh = undefined;
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

  getGroupTool() {
    return this.tools.find((tool) => tool.name === ToolName.Group) as GroupTool;
  }

  getCableTool() {
    return this.tools.find((tool) => tool.name === ToolName.Cable) as CableTool;
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

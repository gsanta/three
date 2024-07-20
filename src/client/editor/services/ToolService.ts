import { ThreeEvent } from '@react-three/fiber';
import Tool, { EventObject, ToolInfo } from '../types/Tool';
import ToolName from '../types/ToolName';
import { store } from '@/client/common/utils/store';
import { Mesh, Vector3 } from 'three';
import SelectTool from '@/client/editor/controllers/tools/SelectTool';
import AddTool from '../controllers/tools/add/AddTool';
import GroupTool from '@/client/group/GroupTool';
import CableTool from '@/client/editor/controllers/tools/CableTool';
import VectorUtils from '@/client/editor/utils/vectorUtils';
import ToolStore from '../stores/tool/ToolStore';
import { setSelectedTool } from '../stores/tool/toolSlice';

export type ScenePointerEvent = ThreeEvent<PointerEvent> & {
  gridIndex?: number;
  gridX?: number;
  gridY?: number;
};

class ToolService {
  constructor(tools: Tool[], toolStore: ToolStore) {
    this.tools = tools;
    this.toolStore = toolStore;
    this.info = {
      pos: new Vector3(),
      drag: [0, 0, 0],
      dragDelta: [0, 0, 0],
      clientX: 0,
      clientY: 0,
    };
  }

  onExecute() {
    const { selectedTool } = store.getState().tool;
    this.getTool(selectedTool)?.onExecute(this.info);
  }

  onPointerDown(event: ScenePointerEvent) {
    this.info.pos = event.point;
    this.info.clientX = event.clientX;
    this.info.clientY = event.clientY;
    this.info.downPos = event.point;
    this.info.gridX = event.gridX;
    this.info.gridY = event.gridY;
    this.info.gridIndex = event.gridIndex;

    this.setEventObject(event);

    const { selectedTool } = store.getState().tool;
    this.getTool(selectedTool)?.onPointerDown(this.info);
  }

  onPointerEnter(event: ThreeEvent<PointerEvent>, partIndex?: string) {
    const { selectedTool } = store.getState().tool;

    this.setEventObject(event);
    this.info.partIndex = partIndex;

    this.getTool(selectedTool)?.onPointerEnter(this.info);
  }

  onPointerLeave(event: ThreeEvent<PointerEvent>) {
    const { selectedTool } = store.getState().tool;

    this.setEventObject(event);

    this.getTool(selectedTool)?.onPointerLeave(this.info);
  }

  onPointerMove(event: ThreeEvent<PointerEvent>) {
    this.info.pos = event.point;
    this.info.clientX = event.clientX;
    this.info.clientY = event.clientY;

    if (
      !this.info.isDragHappened &&
      this.info.downPos &&
      VectorUtils.size(VectorUtils.sub(this.info.pos.toArray(), this.info.downPos?.toArray())) > 0.1
    ) {
      this.info.isDragHappened = true;
    }

    this.setEventObject(event);

    const { selectedTool } = store.getState().tool;
    this.getTool(selectedTool)?.onPointerMove(this.info);
  }

  onPointerUp() {
    const { selectedTool } = store.getState().tool;
    this.getTool(selectedTool)?.onPointerUp(this.info);
    this.info.isDragHappened = false;
    this.info.downPos = undefined;
  }

  onDrag(delta: Vector3) {
    // this.info.draggedMesh = mesh;
    this.info.drag = delta.toArray();

    const prevDrag = this.toolStore.getSelectOptions().drag;
    this.info.dragDelta = VectorUtils.sub(this.info.drag, prevDrag);

    const { selectedTool } = store.getState().tool;
    this.getTool(selectedTool)?.onDrag(this.info);
  }

  onDragEnd() {
    const { selectedTool } = store.getState().tool;
    this.getTool(selectedTool)?.onDragEnd(this.info);
    this.info.drag = [0, 0, 0];
    this.info.draggedMesh = undefined;
  }

  onRendered() {
    const { selectedTool } = store.getState().tool;
    this.getTool(selectedTool)?.onRendered();
  }

  getTools(): Tool[] {
    return this.tools;
  }

  getTool(name?: ToolName) {
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

  setSelectedTool(toolName: ToolName) {
    this.getTool(store.getState().tool.selectedTool)?.onDeselect();
    store.dispatch(setSelectedTool(toolName));
  }

  private setEventObject(event: ThreeEvent<PointerEvent>) {
    this.info.eventObject = {
      name: event.eventObject.name,
      userData: event.eventObject.userData as EventObject['userData'],
    };
  }

  private info: ToolInfo;

  private tools: Tool[];

  private toolStore: ToolStore;

  private mesh: Mesh | undefined;
}

export default ToolService;

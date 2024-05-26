/* eslint-disable @typescript-eslint/no-unused-vars */
import ToolName from './ToolName';
import { IconName } from '../../common/components/icon/Icon';
import { Mesh, Vector3 } from 'three';
import Num3 from '@/client/editor/types/Num3';
import Block from '@/client/editor/types/Block';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import UpdateService from '../services/update/UpdateService';

export type EventObject = {
  name: string;
  userData: {
    modelId: string;
  };
};

export interface ToolInfo {
  pos: Vector3;
  drag: Num3;
  dragDelta: Num3;
  eventObject?: EventObject;
  selectedMesh?: Mesh;
  clientX: number;
  clientY: number;
  draggedMesh?: Block;
}

abstract class Tool {
  name: ToolName;

  iconName?: IconName;

  showOnToolbar = true;

  protected store: BlockStore;

  protected update: UpdateService;

  constructor(store: BlockStore, update: UpdateService, name: ToolName, iconName?: IconName) {
    this.name = name;
    this.iconName = iconName;
    this.store = store;
    this.update = update;
  }

  onPointerDown(_info: ToolInfo) {}

  onPointerMove(_info: ToolInfo) {}

  onPointerEnter(_info: ToolInfo) {}

  onPointerLeave(_info: ToolInfo) {}

  onDrag(_info: ToolInfo) {}

  onDragEnd(_info: ToolInfo) {}

  onExecute(_info: ToolInfo) {}

  onRendered() {}
}

export default Tool;

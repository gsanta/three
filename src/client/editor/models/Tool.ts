/* eslint-disable @typescript-eslint/no-unused-vars */
import ToolName from './ToolName';
import { IconName } from '../../common/components/lib/Icon';
import { Mesh, Vector3 } from 'three';
import Num3 from '@/client/editor/models/Num3';
import Block from '@/client/editor/models/Block';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import TransactionService from '../services/transaction/TransactionService';

export type EventObject = {
  name: string;
  userData: {
    modelId: string;
  };
};

export interface ToolInfo {
  downPos?: Vector3;
  pos: Vector3;
  drag: Num3;
  dragDelta: Num3;
  eventObject?: EventObject;
  isDragHappened?: boolean;
  clientX: number;
  clientY: number;
  gridIndex?: number;
  gridX?: number;
  gridY?: number;
  draggedMesh?: Block;
  partIndex?: string;
}

abstract class Tool {
  name: ToolName;

  iconName?: IconName;

  showOnToolbar = true;

  protected blockStore: BlockStore;

  protected update: TransactionService;

  constructor(store: BlockStore, update: TransactionService, name: ToolName, iconName?: IconName) {
    this.name = name;
    this.iconName = iconName;
    this.blockStore = store;
    this.update = update;
  }

  onPointerDown(_info: ToolInfo) {}

  onPointerMove(_info: ToolInfo) {}

  onPointerEnter(_info: ToolInfo) {}

  onPointerLeave(_info: ToolInfo) {}

  onPointerUp(_info: ToolInfo) {}

  onDrag(_info: ToolInfo) {}

  onDragEnd(_info: ToolInfo) {}

  onExecute(_info: ToolInfo) {}

  onDeselect() {}

  onRendered(_blockId: string) {}
}

export default Tool;

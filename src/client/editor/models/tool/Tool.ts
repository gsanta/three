/* eslint-disable @typescript-eslint/no-unused-vars */
import ToolName from './ToolName';
import { IconName } from '../../../common/components/lib/Icon';
import { Vector3 } from 'three';
import Num3 from '@/client/editor/models/math/Num3';
import BlockData from '@/client/editor/models/block/BlockData';
import BlockStore from '@/client/editor/stores/block/BlockStore';
import TransactionService from '../../services/transaction/TransactionService';

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
  gridIndex: number;
  gridX?: number;
  gridY?: number;
  draggedMesh?: BlockData;
  partName?: string;
}

export type ToolEventName = 'onPointerMove';

abstract class Tool {
  name: ToolName;

  iconName?: IconName;

  showOnToolbar = true;

  protected blockStore: BlockStore;

  protected transaction: TransactionService;

  constructor(store: BlockStore, transaction: TransactionService, name: ToolName, iconName?: IconName) {
    this.name = name;
    this.iconName = iconName;
    this.blockStore = store;
    this.transaction = transaction;
  }

  onActivate() {}

  onMeshRendered(_name: ToolEventName) {}

  onPointerDown(_info: ToolInfo) {}

  onPointerDrag(_info: ToolInfo) {}

  onPointerMove(_info: ToolInfo) {}

  onPointerEnter(_info: ToolInfo) {}

  onPointerLeave(_info: ToolInfo) {}

  onPointerUp(_info: ToolInfo) {}

  onDrag(_info: ToolInfo) {}

  onDragEnd(_info: ToolInfo) {}

  onExecute(_info: ToolInfo) {}

  onDeactivate() {}

  onRendered() {}
}

export default Tool;

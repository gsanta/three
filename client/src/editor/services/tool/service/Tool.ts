import ToolName from '../state/ToolName';
import { IconName } from '../../../../common/components/icon/Icon';
import type { Store } from '../../../../common/utils/store';
import { Mesh, Vector3 } from 'three';
import Num3 from '@/editor/types/Num3';
import Block from '@/editor/types/Block';
import BlockStore from '@/editor/features/block/service/BlockStore';

export interface ToolInfo {
  pos: Vector3;
  drag: Num3;
  eventObjectName: string;
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

  constructor(store: BlockStore, name: ToolName, iconName?: IconName) {
    this.name = name;
    this.iconName = iconName;
    this.store = store;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPointerDown(_info: ToolInfo) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPointerMove(_info: ToolInfo) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDrag(_info: ToolInfo) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDragEnd(_info: ToolInfo) {}
}

export default Tool;

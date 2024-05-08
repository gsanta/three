import ToolName from '../state/ToolName';
import { IconName } from '../../../../common/components/icon/Icon';
import { Mesh, Vector3 } from 'three';
import Num3 from '@/client/editor/types/Num3';
import Block from '@/client/editor/types/Block';
import BlockStore from '@/client/editor/features/block/BlockStore';
import UpdateService from '../../block/services/update/UpdateService';

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

  protected update: UpdateService;

  constructor(store: BlockStore, update: UpdateService, name: ToolName, iconName?: IconName) {
    this.name = name;
    this.iconName = iconName;
    this.store = store;
    this.update = update;
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

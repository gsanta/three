import ToolName from './ToolName';
import { IconName } from '../../../../common/components/icon/Icon';
import type { Store } from '../../../../common/utils/store';
import { Vector3 } from 'three';

export interface PointerInfo {
  pos: Vector3;
  dragPos: Vector3;
  eventObjectName: string;
}

abstract class Tool {
  name: ToolName;

  iconName: IconName;

  protected store: Store;

  constructor(store: Store, name: ToolName, iconName: IconName) {
    this.name = name;
    this.iconName = iconName;
    this.store = store;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPointerDown(_info: PointerInfo) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPointerMove(_info: PointerInfo) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDrag(_info: PointerInfo) {}
}

export default Tool;

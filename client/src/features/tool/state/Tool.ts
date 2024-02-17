import ToolName from './ToolName';
import { IconName } from '../../../common/components/icon/Icon';
import type { Store } from '../../../common/utils/store';

export interface PointerInfo {
  x: number;
  y: number;
  z: number;
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
  onClick(_info: PointerInfo) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onMouseMove(_info: PointerInfo) {}
}

export default Tool;

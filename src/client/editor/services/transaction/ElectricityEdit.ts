import { ElectricConnectionUpdate, ElectricNodeUpdate } from '../../stores/block/blockSlice.types';
import ElectricConnection from '../electricity/types/ElectricConnection';
import ElectricNode from '../electricity/types/ElectricNode';

class ElectricityEdit {
  updateNode(node: ElectricNode) {
    this.updates.push({ store: 'electricity', node });
  }

  updateConnection(connection: ElectricConnection) {
    this.updates.push({ store: 'electricity', connection });
  }

  getUpdates() {
    return this.updates;
  }

  clear() {
    this.updates = [];
  }

  private updates: (ElectricNodeUpdate | ElectricConnectionUpdate)[] = [];
}

export default ElectricityEdit;

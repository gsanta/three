import { ElectricConnectionUpdate, ElectricNodeUpdate } from '../block/blockSlice.types';
import { ElectricityState } from './electricitySlice';

class ElectricityUpdater {
  update(state: ElectricityState, updates: (ElectricNodeUpdate | ElectricConnectionUpdate)[]) {
    updates.forEach((update) => {
      if ('node' in update) {
        state.nodes[update.node.id] = update.node;
      } else if ('connection' in update) {
        state.connections[update.connection.id] = update.connection;
      }
    });
  }
}

export default ElectricityUpdater;

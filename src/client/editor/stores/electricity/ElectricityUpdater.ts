import { ElectricConnectionUpdate, ElectricNodeUpdate } from '../block/blockSlice.types';
import { ElectricityState } from './electricitySlice';

class ElectricityUpdater {
  update(state: ElectricityState, updates: (ElectricNodeUpdate | ElectricConnectionUpdate)[]) {
    updates.forEach((update) => {
      if ('node' in update) {
        state.nodes[update.node.id] = update.node;
        this.updateBlockIdMap(state, update.node.id, update.node.blockId);
      } else if ('connection' in update) {
        state.connections[update.connection.id] = update.connection;
        this.updateBlockIdMap(state, update.connection.id, update.connection.blockId);
      }
    });
  }

  private updateBlockIdMap(state: ElectricityState, id: string, blockId: string) {
    if (!state.blockIdToItems[blockId]) {
      state.blockIdToItems[blockId] = [];
    }

    if (!state.blockIdToItems[blockId].includes(id)) {
      state.blockIdToItems[blockId].push(id);
    }
  }
}

export default ElectricityUpdater;

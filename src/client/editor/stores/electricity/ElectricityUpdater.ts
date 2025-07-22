import { UpdateBlock } from '../block/blockSlice.types';
import { ElectricityState } from './electricitySlice';
import { getElectricityDecorator, isElectricityDecorator } from './ElectricityStore';

class ElectricityUpdater {
  update(state: ElectricityState, updates: UpdateBlock[]) {
    updates.forEach((update) => {
      if ('block' in update && update.block) {
        const block = update.block;

        if (block.electricNodes) {
          state.edges[block.id] = block;
        } else if (block.electricEdges) {
          state.nodes[block.id] = block;

          if (!state.relations[block.id]) {
            state.relations[block.id] = [];
          }

          block.electricEdges?.forEach((edgeId) => {
            if (!state.relations[block.id].find((relation) => relation.edgeId === edgeId)) {
              const edge = state.edges[edgeId];
              const nodes = edge.electricNodes as [string, string];
              state.relations[block.id].push({
                to: nodes[0] === block.id ? nodes[1] : nodes[0],
                edgeId,
              });
            }
          });
        }
      } else if ('decoration' in update) {
        const { decoration } = update;

        if (decoration) {
          if (getElectricityDecorator(decoration)) {
            state.decorators[decoration.decoration][decoration.id] = decoration;
          }
        }
      } else if ('remove' in update && update.remove) {
        const block = update.remove;

        if (state.nodes[block.id]) {
          delete state.nodes[block.id];
        } else if (state.edges[block.id]) {
          delete state.edges[block.id];
        }

        if (state.relations[block.id]) {
          delete state.relations[block.id];
        }

        if (block) {
          block.decorations.forEach((decorator) => {
            if (isElectricityDecorator(decorator)) {
              delete state.decorators[decorator][update.remove.id];
            }
          });
        }
      }
    });
  }
}

export default ElectricityUpdater;

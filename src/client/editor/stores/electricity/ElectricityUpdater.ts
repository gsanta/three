import { UpdateBlock } from '../block/blockSlice.types';
import { ElectricityState } from './electricitySlice';
import { isElectricityDecoratorName } from './ElectricityStore';

class ElectricityUpdater {
  update(state: ElectricityState, updates: UpdateBlock[]) {
    updates.forEach((update) => {
      if ('decoration' in update) {
        const { decoration } = update;

        if (decoration) {
          if (isElectricityDecoratorName(decoration)) {
            state.decorators[decoration.decoration][decoration.id] = decoration;
          }
        }
      }
    });
  }
}

export default ElectricityUpdater;

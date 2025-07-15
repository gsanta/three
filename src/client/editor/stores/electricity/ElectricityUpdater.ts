import { UpdateBlock } from '../block/blockSlice.types';
import { ElectricityState } from './electricitySlice';
import { isElectricityDecoratorName } from './ElectricityStore';

class ElectricityUpdater {
  update(state: ElectricityState, updates: UpdateBlock[]) {
    updates.forEach((update) => {
      if ('decoration' in update) {
        const { decoration } = update;

        if (decoration) {
          const decorator = decoration.decoration;
          if (isElectricityDecoratorName(decorator)) {
            state.decorations[decorator][decoration.id] = decoration as any;
          }
        }
      }
    });
  }
}

export default ElectricityUpdater;

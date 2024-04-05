import { SpecificKeys, SpecificPartials, SpecificType } from '@/editor/services/scene/sceneSlice';
import type { PartialDeep } from 'type-fest';

abstract class Updater<T extends SpecificKeys> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(orig: SpecificType<T>, partial: PartialDeep<SpecificPartials[T]>): SpecificType<T> {
    throw new Error('Unimplemented method');
  }
}

export default Updater;

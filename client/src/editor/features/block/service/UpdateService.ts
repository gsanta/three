import { Store } from '@/common/utils/store';
import { SpecificKeys, SpecificPartials, updateSpecific } from '@/editor/services/scene/sceneSlice';
import Updater from './factory/Updater';
import type { PartialDeep } from 'type-fest';
import PoleUpdater from './factory/PoleUpdater';

class UpdateService {
  constructor(store: Store) {
    this.store = store;
  }

  updateSpecific<T extends SpecificKeys>(type: T, id: string, partial: PartialDeep<SpecificPartials[T]>) {
    const orig = this.store.getState().scene.present.specifics[type][id];
    const updated = this.updaters[type]?.update(orig, partial);

    if (!updated) {
      throw new Error(`No updater found for type ${type}`);
    }

    this.store.dispatch(updateSpecific({ id: id, key: type, val: updated }));
  }

  private store: Store;

  private updaters: Partial<Record<SpecificKeys, Updater<SpecificKeys>>> = {
    poles: new PoleUpdater(),
  };
}

export default UpdateService;

import { Store } from '@/client/common/utils/store';

class ElectricityStore {
  constructor(store: Store) {
    this.store = store;
  }

  getDecorator<T extends ElectricityDecoratorName>(decoratorName: T, id?: string): ElectricityDecoratorNameToType[T] {
    if (!id) {
      throw new Error('Id is not defined');
    }

    const decoration = this.getState().decorators[decoratorName][id];

    if (!decoration) {
      throw new Error(`Decoration '${decoratorName}' not found`);
    }

    return decoration as ElectricityDecoratorNameToType[T];
  }

  hasDecorator<T extends ElectricityDecoratorName>(decoratorName: T, id: string): boolean {
    try {
      return !!this.getDecorator(decoratorName, id);
    } catch (e) {
      return false;
    }
  }

  getRelations() {
    return this.getState().relations;
  }

  private getState() {
    return this.store.getState().electricity;
  }

  private store: Store;
}

export default ElectricityStore;

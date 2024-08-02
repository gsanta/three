import { Store } from '@/client/common/utils/store';
import { BlockState } from '../../stores/block/blockSlice.types';
import { updateState } from '../../stores/block/blockActions';

class ImportJson {
  constructor(store: Store) {
    this.store = store;
  }

  import(json: string) {
    const data: { city: BlockState; building: BlockState } = JSON.parse(json);

    this.store.dispatch(updateState(data));

    return data;
  }

  private store: Store;
}

export default ImportJson;

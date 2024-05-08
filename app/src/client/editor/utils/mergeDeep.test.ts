import BlockSettings, { defaultBlockSettings } from '../types/BlockSettings';
import mergeDeep from './mergeDeep';

describe('mergeDeep', () => {
  it('can merge a deep partial structure', () => {
    const newBlockSettings = mergeDeep<BlockSettings>(defaultBlockSettings, { rotation: { x: [0, 10] } });

    expect(newBlockSettings).toEqual({ ...defaultBlockSettings, ...{ rotation: { x: [0, 10] } } });
  });
});

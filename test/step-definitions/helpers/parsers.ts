import Num3 from '@/client/editor/models/Num3';
import VectorUtils from '@/client/editor/utils/vectorUtils';
import assert from 'assert';
import ExtendedWorld from '../ExtendedWorld';
import { checkPosition } from './checks';

export function parsePosition(this: ExtendedWorld, position: string, actual: Num3) {
  const expected = checkPosition.call(this, position);

  const diff = VectorUtils.size(VectorUtils.sub(expected, actual));

  assert.ok(diff < 0.1, `Expected number (${expected.join(', ')}) to be close to (${actual.join(', ')})`);
}

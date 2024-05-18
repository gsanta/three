/* eslint-disable jest/no-standalone-expect */
import Block from '@/client/editor/types/Block';
import Num3 from '@/client/editor/types/Num3';
import { Vector3 } from 'three';
import TestEnv from '../TestEnv';
import MeshUtils from '@/client/editor/utils/MeshUtils';

expect.extend({
  toMatchBlock(blockId: string, expectedBlock: Partial<Block>) {
    const block = testEnv.blockStore.getBlock(blockId);
    // const pass = this.equals(actual, expected.toArray());

    expect(block).toMatchObject(expectedBlock);

    return { pass: true, message: () => 'abcd' };
  },

  toBeCloseToPosition(actualPosition: Num3, expectedPosition: Num3) {
    expect(actualPosition[0]).toBeCloseTo(expectedPosition[0]);
    expect(actualPosition[1]).toBeCloseTo(expectedPosition[1]);
    expect(actualPosition[2]).toBeCloseTo(expectedPosition[2]);

    return { pass: true, message: () => 'Positions were close' };
  },

  toBeCloseTo(received: number, expected: number, precision = 0.05) {
    const pass = Math.abs(received - expected) < precision;
    return {
      pass,
      message: () => `expected ${received} to be close to ${expected} with precision ${precision}`,
    };
  },

  toMatchMeshPosition(actual: Num3, { block, env, meshName }: { block: Block; env: TestEnv; meshName: string }) {
    const baseMesh = env.sceneStore.getMesh(block.id);
    const expected = new Vector3();
    MeshUtils.findByName(baseMesh, meshName).getWorldPosition(expected);

    const pass = this.equals(actual, expected.toArray());

    if (pass) {
      return {
        message: () => `Expected: ${this.utils.printExpected(expected)}\nReceived: ${this.utils.printReceived(actual)}`,
        pass: true,
      };
    }
    return {
      message: () =>
        `Expected: ${this.utils.printExpected(expected.toArray())}\nReceived: ${this.utils.printReceived(
          actual,
        )}\n\n${this.utils.diff(expected.toArray(), actual)}`,
      pass: false,
    };
  },
});

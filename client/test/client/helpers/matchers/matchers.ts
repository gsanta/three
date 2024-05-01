import Block from '@/client/editor/types/Block';
import Num3 from '@/client/editor/types/Num3';
import { Vector3 } from 'three';
import TestEnv from '../TestEnv';
import MeshUtils from '@/client/editor/utils/MeshUtils';

expect.extend({
  toMatchMeshPosition(actual: Num3, { block, env, meshName }: { block: Block; env: TestEnv; meshName: string }) {
    const baseMesh = env.context.scene.getMesh(block.id);
    const expected = new Vector3();
    MeshUtils.findByName(baseMesh, meshName).getWorldPosition(expected);

    const pass = this.equals(actual, expected.toArray());

    if (pass) {
      return {
        message: () =>
          `Expected: ${this.utils.printExpected(expected)}\nReceived: ${this.utils.printReceived(actual.toArray())}`,
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

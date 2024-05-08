import TestEnv from '../TestEnv';
import Block from '@/client/editor/types/Block';

interface CustomMatchers<R = unknown> {
  toMatchMeshPosition({ block, env, meshName }: { block: Block; env: TestEnv; meshName: string }): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { setupTestEnv } from './client/support/TestEnv';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

//   let env: TestEnv;

//   beforeEach(() => {
//   });

//   afterEach(() => {
//     env.teardown();
//   });

global.beforeEach(() => {
  (global as any).testEnv = setupTestEnv();
});

global.afterEach(() => {
  (global as any).testEnv.teardown();
});

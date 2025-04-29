import { World, setWorldConstructor } from '@cucumber/cucumber';
import TestEnv, { setupTestEnv } from './support/TestEnv';

class ExtendedWorld extends World {
  env?: TestEnv;

  async setup() {
    this.env = await setupTestEnv();
  }

  getEnv() {
    if (!this.env) {
      throw new Error('env is not setup');
    }

    return this.env;
  }
}

setWorldConstructor(ExtendedWorld);

export default ExtendedWorld;

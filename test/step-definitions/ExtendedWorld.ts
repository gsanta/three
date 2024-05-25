import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import TestEnv, { setupTestEnv } from './support/TestEnv';

class ExtendedWorld extends World {
  env: TestEnv;

  constructor(props: IWorldOptions) {
    super(props);

    this.env = setupTestEnv();
  }
}

setWorldConstructor(ExtendedWorld);

export default ExtendedWorld;

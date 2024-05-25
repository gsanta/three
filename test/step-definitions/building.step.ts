import { Given } from '@cucumber/cucumber';
import { addTemplateToPosition } from './setup.step';
import ExtendedWorld from './ExtendedWorld';
import { setupTestEnv } from './support/TestEnv';

Given('I have a building base', function (this: ExtendedWorld) {
  this.env = setupTestEnv();
  addTemplateToPosition.call(this, 'building-base-1', 0, 0, 0);
});

Given('I have a building base with id {string}', function (this: ExtendedWorld, id: string) {
  this.env = setupTestEnv();
  this.env.sceneService.setUuid(id);
  addTemplateToPosition.call(this, 'building-base-1', 0, 0, 0);
});

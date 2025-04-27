import { Given } from '@cucumber/cucumber';
import { addTemplateToPosition } from './setup.step';
import ExtendedWorld from './ExtendedWorld';
import TestSceneService from './support/TestSceneService';

Given('I have a building base', async function (this: ExtendedWorld) {
  this.setup();
  await addTemplateToPosition.call(this, 'building-base-1', 0, 0, 0);
});

Given('I have a building base with id {string}', async function (this: ExtendedWorld, id: string) {
  this.setup();
  (this.getEnv().editorContext.sceneService as TestSceneService).setUuid(id);
  await addTemplateToPosition.call(this, 'building-base-1', 0, 0, 0);
});

import { Given } from '@cucumber/cucumber';
import { addTemplateToPosition } from './setup.step';
import ExtendedWorld from './ExtendedWorld';

Given('I have a building base', function (this: ExtendedWorld) {
  this.env.teardown();
  addTemplateToPosition.call(this, 'building-base-1', 0, 0, 0);
});

Given('I have a building base with id {string}', async function (this: ExtendedWorld, id: string) {
  this.env.teardown();
  this.env.sceneService.setUuid(id);
  await addTemplateToPosition.call(this, 'building-base-1', 0, 0, 0);
});

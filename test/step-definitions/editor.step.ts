import { Then, When } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import assert from 'assert';
import { store } from '@/client/common/utils/store';
import { waitForRenderNotification } from './helpers/waitFor';

Then('Editor mode is {string}', function (this: ExtendedWorld, mode: string) {
  assert(store.getState().editor.editingMode === mode);
});

When('I wait block {string} to notify on render', async function (this: ExtendedWorld, blockId: string) {
  await waitForRenderNotification(blockId, this);
});

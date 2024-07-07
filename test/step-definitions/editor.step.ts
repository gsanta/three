import { Then } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';
import assert from 'assert';
import { store } from '@/client/common/utils/store';

Then('Editor mode is {string}', function (this: ExtendedWorld, mode: string) {
  assert(store.getState().editor.editingMode === mode);
});

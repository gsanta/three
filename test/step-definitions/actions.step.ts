import { When } from '@cucumber/cucumber';
import ExtendedWorld from './ExtendedWorld';

When('I execute action {string}', function (this: ExtendedWorld, actionName: string) {
  const selectedBlockId = this.getEnv().editorContext.blockCategoryStore.getSelectedBlock();

  if (!selectedBlockId) {
    throw new Error('No block selected');
  }

  const selectedBlock = this.getEnv().editorContext.blockStore.getBlock(selectedBlockId);

  const selectedAction = this.getEnv()
    .editorContext.blockCategoryStore.getActions(selectedBlock.category)
    .find((action) => action.name === actionName);

  if (!selectedAction) {
    throw new Error(`Action ${actionName} not found for block category ${selectedBlock.category}`);
  }

  selectedAction.execute(selectedBlock);
});

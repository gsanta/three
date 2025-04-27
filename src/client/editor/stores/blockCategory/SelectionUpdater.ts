import BlockDecoration from '../../models/BlockCategory';
import { UpdateBlock } from '../block/blockSlice.types';
import { BlockCategoyState } from './blockCategorySlice';

class SelectionUpdater {
  update(state: BlockCategoyState, updates: UpdateBlock<BlockDecoration>[]) {
    updates.forEach((update) => {
      if ('select' in update) {
        const selectedBlock = update.select;

        state.selectedBlocks = {};
        state.selectedRootBlockIds = selectedBlock.map((block) => block.id);

        selectedBlock.forEach((block) => {
          state.selectedBlocks[block.id] = true;
        });

        state.currentContextMenuActions = state.contextMenuActions.filter((action) => {
          const selectionLength = selectedBlock.length;
          const categories = selectedBlock.map((selection) => selection.category);
          if (action.categoryName && action.categoryName2) {
            if (selectionLength === 2) {
              return categories.includes(action.categoryName) && categories.includes(action.categoryName2);
            }
          } else if (action.categoryName) {
            if (selectionLength === 1) {
              return categories.includes(action.categoryName);
            }
          }

          return false;
        });
      } else if ('remove' in update) {
        const selectedIndex = state.selectedRootBlockIds.indexOf(update.remove.id);
        if (selectedIndex !== -1) {
          state.selectedRootBlockIds.splice(selectedIndex, 1);
        }

        if (state.selectedBlocks[update.remove.id]) {
          delete state.selectedBlocks[update.remove.id];
        }
      }
    });

    // const newSelections = updates
    //   .filter((update) => 'select' in update && update.newState === 'selected')
    //   .map((update) => (update as BlockSelect).select);

    console.log(state.contextMenuActions.length);
  }
}

export default SelectionUpdater;

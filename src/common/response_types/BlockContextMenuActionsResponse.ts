import { BlockContextMenuActionName } from '../model_types/BlockContextMenuAction';

type BlockContextMenuActionsResponse = {
  items: {
    categories: {
      contextMenuActionName: string;
      categoryName: string;
      categoryName2: string;
    }[];
    id: number;
    name: BlockContextMenuActionName;
  }[];
};

export default BlockContextMenuActionsResponse;

import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import BlockAddMethodsResponse from '@/common/response_types/BlockAddMethodsResponse';
import BlockCategoriesResponse from '@/common/response_types/BlockCategoriesResponse';
import BlockContextMenuActionsResponse from '@/common/response_types/BlockContextMenuActionsResponse';

type EditorPageProps = {
  blockAddMethods: BlockAddMethodsResponse['items'];
  blockCategories: BlockCategoriesResponse['items'];
  blockContextMenuActions: BlockContextMenuActionsResponse['items'];
  blockTypes: BlockConstantData[];
};

export default EditorPageProps;

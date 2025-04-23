import BlockCategoriesResponse from '@/common/response_types/BlockCategoriesResponse';
import './app.scss';
import '../globals.css';
import EditorPage from './EditorPage';
import db from '@/bff/config/db';
import BlockAddMethodsResponse from '@/common/response_types/BlockAddMethodsResponse';
import BlockContextMenuActionsResponse from '@/common/response_types/BlockContextMenuActionsResponse';

const Page = async () => {
  const blockCategories = (await db.blockCategory.findMany()) as BlockCategoriesResponse['items'];
  const blockAddMethods = (await db.blockAddMethod.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  })) as BlockAddMethodsResponse['items'];

  const blockContextMenuActions = (await db.blockContextMenuAction.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  })) as BlockContextMenuActionsResponse['items'];

  return (
    <EditorPage
      blockCategories={{
        items: blockCategories,
      }}
      blockAddMethods={{ items: blockAddMethods }}
      blockContextMenuActions={{ items: blockContextMenuActions }}
    />
  );
};

export default Page;

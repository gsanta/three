import BlockCategoriesResponse from '@/common/response_types/BlockCategoriesResponse';
import './app.scss';
import EditorPage from './EditorPage';
import db from '@/bff/config/db';
import BlockAddMethodsResponse from '@/common/response_types/BlockAddMethodsResponse';

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

  return (
    <EditorPage
      blockCategories={{
        items: blockCategories,
      }}
      blockAddMethods={{ items: blockAddMethods }}
    />
  );
};

export default Page;

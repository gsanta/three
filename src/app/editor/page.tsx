import BlockCategoriesResponse from '@/common/response_types/BlockCategoriesResponse';
import './app.scss';
import EditorContent from './EditorContent';
import db from '@/bff/config/db';
import BlockAddMethodsResponse from '@/common/response_types/BlockAddMethodsResponse';

const Page = async () => {
  const blockCategories = (await db.blockCategory.findMany()) as BlockCategoriesResponse['items'];
  const blockAddMethods = (await db.blockAddMethod.findMany()) as BlockAddMethodsResponse['items'];

  return (
    <EditorContent
      blockCategories={{
        items: blockCategories,
      }}
      blockAddMethods={{ items: blockAddMethods }}
    />
  );
};

export default Page;

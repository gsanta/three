import db from '@/bff/config/db';
import BlockAddMethodsResponse from '@/common/response_types/BlockAddMethodsResponse';
import BlockCategoriesResponse from '@/common/response_types/BlockCategoriesResponse';
import BlockContextMenuActionsResponse from '@/common/response_types/BlockContextMenuActionsResponse';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import {
  setBlockCategories,
  setBlockAddMethods,
  setBlockContextMenuActions,
} from './stores/blockCategory/blockCategorySlice';
import BlockConstantData from './models/block/BlockConstantData';
import { setTemplates } from './stores/blockType/blockTypeSlice';
import { initState } from './stores/block/blockActions';
import EditorPageProps from '@/app/editor/EditorPageProps';

export type EditorDataReturnType = {
  blockCategories: BlockCategoriesResponse['items'];
  blockAddMethods: BlockAddMethodsResponse['items'];
  blockContextMenuActions: BlockContextMenuActionsResponse['items'];
  blockTypes: BlockConstantData[];
};

export const fetchEditorData = async (): Promise<EditorDataReturnType> => {
  const categories = (await db.blockCategory.findMany()) as BlockCategoriesResponse['items'];
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

  const blockTypesData = await db.blockType.findMany();
  const blockTypes = blockTypesData.map((blockType) => ({
    ...blockType,
    category: blockType.categoryName,
  })) as unknown as BlockConstantData[];

  return {
    blockCategories: categories,
    blockAddMethods,
    blockContextMenuActions,
    blockTypes,
  };
};

export const dispatchEditorData = (data: EditorPageProps, dispatch: Dispatch<UnknownAction>) => {
  const { blockCategories, blockAddMethods, blockContextMenuActions, blockTypes } = data;

  dispatch(setBlockCategories(blockCategories));
  dispatch(setBlockAddMethods(blockAddMethods));
  dispatch(setBlockContextMenuActions(blockContextMenuActions));
  dispatch(setTemplates(blockTypes));
  dispatch(initState());
};

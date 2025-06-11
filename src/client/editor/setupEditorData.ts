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
import BlockConstantData, { BlockTypeName } from './models/block/BlockConstantData';
import { setBlockTypes } from './stores/blockType/blockTypeSlice';
import { initState } from './stores/block/blockActions';
import EditorPageProps from '@/app/editor/EditorPageProps';
import { BlockDecorations } from './models/block/BlockDecoration';

export type EditorDataReturnType = {
  blockCategories: BlockCategoriesResponse['items'];
  blockDecorations: Record<BlockTypeName, Partial<BlockDecorations>>;
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
  const blockTypes = blockTypesData.map((blockType) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { decorationData: _, ...rest } = blockType;
    return {
      ...rest,
      category: blockType.categoryName,
    } as unknown as BlockConstantData;
  });

  const blockDecorations: Record<BlockTypeName, Partial<BlockDecorations>> = {};

  blockTypesData.forEach((blockType) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { decorationData, type } = blockType;

    blockDecorations[type] = decorationData as unknown as Partial<BlockDecorations>;
  });

  return {
    blockCategories: categories,
    blockDecorations,
    blockAddMethods,
    blockContextMenuActions,
    blockTypes,
  };
};

export const dispatchEditorData = (data: EditorPageProps, dispatch: Dispatch<UnknownAction>) => {
  const { blockCategories, blockDecorations, blockAddMethods, blockContextMenuActions, blockTypes } = data;

  dispatch(setBlockCategories(blockCategories));
  dispatch(setBlockAddMethods(blockAddMethods));
  dispatch(setBlockContextMenuActions(blockContextMenuActions));
  dispatch(setBlockTypes({ blocks: blockTypes, decorations: blockDecorations }));
  dispatch(initState());
};

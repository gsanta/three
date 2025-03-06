import { useAppDispatch } from '@/client/common/hooks/hooks';
import api from '@/client/common/utils/api';
import { setBlockCategories } from '@/client/editor/stores/blockCategory/blockCategorySlice';
import BlockCategoriesResponse from '@/common/response_types/BlockCategoriesResponse';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';

const useBlockCategories = () => {
  const { data, isSuccess } = useQuery<AxiosResponse<BlockCategoriesResponse>>({
    queryKey: ['block-categories'],
    queryFn: () => api.get('/api/block-categories'),
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setBlockCategories(data.data.items));
    }
  }, [data, dispatch, isSuccess]);
};

export default useBlockCategories;

import { ServerError } from '@/client/common/components/ErrorMessage';
import { useAppDispatch } from '@/client/common/hooks/hooks';
import api from '@/client/common/utils/api';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { update } from '../../stores/block/blockSlice';

type LoadSnapshotResponse = {
  state: string;
};

const useLoadSnapshot = () => {
  const dispatch = useAppDispatch();

  const { data, error, isPending, refetch } = useQuery<AxiosResponse<LoadSnapshotResponse>, AxiosError<ServerError>>({
    queryKey: ['snapshot'],
    queryFn: async () => {
      const resp = await api.get('/api/snapshot');
      return resp;
    },
  });

  useEffect(() => {
    if (data?.data.state) {
      dispatch(update(JSON.parse(data.data.state)));
    }
  }, [data, dispatch]);

  return {
    refetchSnapshot: refetch,
    snapshot: data,
    loadSnapshotError: error,
    isLoadSnapshotPending: isPending,
  };
};

export default useLoadSnapshot;

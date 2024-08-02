import { ServerError } from '@/client/common/components/ErrorMessage';
import api from '@/client/common/utils/api';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect } from 'react';
import useEditorContext from '@/app/editor/EditorContext';

type LoadSnapshotResponse = {
  state: string;
};

const useLoadSnapshot = () => {
  const { importer } = useEditorContext();

  const { data, error, isPending, refetch } = useQuery<AxiosResponse<LoadSnapshotResponse>, AxiosError<ServerError>>({
    queryKey: ['snapshot'],
    queryFn: async () => {
      const resp = await api.get('/api/snapshot');
      return resp;
    },
  });

  useEffect(() => {
    if (data?.data.state) {
      importer.import(data.data.state);
    }
  }, [data, importer]);

  return {
    refetchSnapshot: refetch,
    snapshot: data,
    loadSnapshotError: error,
    isLoadSnapshotPending: isPending,
  };
};

export default useLoadSnapshot;

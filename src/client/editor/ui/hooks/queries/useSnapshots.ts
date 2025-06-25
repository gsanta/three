import { ServerError } from '@/client/common/components/lib/ErrorMessage';
import api from '@/client/common/utils/api';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';

type UseSnapshotsResponse = {
  items: {
    id: string;
    name: string;
  }[];
};

const useSnapshots = ({ enabled }: { enabled: boolean } = { enabled: false }) => {
  const { data: session } = useSession();

  const { data, error, isPending, refetch } = useQuery<AxiosResponse<UseSnapshotsResponse>, AxiosError<ServerError>>({
    enabled,
    queryKey: [session?.user?.email, 'snapshots'],
    queryFn: async () => {
      const resp = await api.get('/api/snapshots');
      return resp;
    },
  });

  return {
    snapshots: data?.data.items || [],
    snapshotsError: error,
    isSnapshotsPending: isPending,
    refetchSnapshots: refetch,
  };
};

export default useSnapshots;

import { ServerError } from '@/client/common/components/lib/ErrorMessage';
import api from '@/client/common/utils/api';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import useEditorContext from '@/app/editor/useEditorContext';

type LoadSnapshotResponse = {
  state: string;
};

const useLoadSnapshot = () => {
  const { serializer } = useEditorContext();

  const { mutateAsync, error, isPending } = useMutation<
    AxiosResponse<LoadSnapshotResponse>,
    AxiosError<ServerError>,
    { id: string }
  >({
    mutationFn: async ({ id }) => {
      const resp = await api.get(`/api/snapshots/${id}`);
      return resp;
    },
  });

  const handleLoad = async (id: string) => {
    try {
      const response = await mutateAsync({ id });
      serializer.import(JSON.parse(response.data.state));
    } catch (err) {
      // Prevent the error from bubbling up
    }
  };

  return {
    load: handleLoad,
    loadSnapshotError: error,
    isLoadSnapshotPending: isPending,
  };
};

export default useLoadSnapshot;

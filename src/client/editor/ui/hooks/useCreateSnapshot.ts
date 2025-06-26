import useEditorContext from '@/app/editor/useEditorContext';
import { ServerError } from '@/client/common/components/lib/ErrorMessage';
import { ToastRef } from '@/client/common/components/lib/Toast';
import api from '@/client/common/utils/api';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MutableRefObject } from 'react';

const useCreateSnapshot = (toastRef: MutableRefObject<ToastRef>) => {
  const { serializer } = useEditorContext();

  const { mutateAsync, error, isPending, reset } = useMutation<
    unknown,
    AxiosError<ServerError>,
    { name: string; state: string }
  >({
    mutationFn: async (data) => {
      const resp = await api.post('/api/snapshots', data);
      return resp;
    },
    onSuccess() {
      toastRef.current?.execute('Data saved successfully.');
    },
  });

  const handleMutate = async (name: string) => {
    await mutateAsync({ name, state: JSON.stringify(serializer.export()) });
  };

  return {
    mutate: handleMutate,
    error,
    isPending,
    reset,
  };
};

export default useCreateSnapshot;

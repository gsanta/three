import useEditorContext from '@/app/editor/useEditorContext';
import { ServerError } from '@/client/common/components/lib/ErrorMessage';
import { ToastRef } from '@/client/common/components/lib/Toast';
import api from '@/client/common/utils/api';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MutableRefObject } from 'react';

const useUpdateSnapshot = (toastRef: MutableRefObject<ToastRef>) => {
  const { serializer } = useEditorContext();

  const { mutate, error, isPending } = useMutation<unknown, AxiosError<ServerError>, { id: string; state: string }>({
    mutationFn: async ({ id, state }) => {
      const resp = await api.patch(`/api/snapshots/${id}`, { state });
      return resp;
    },
    onSuccess() {
      toastRef.current?.execute('Data saved successfully.');
    },
  });

  const handleMutate = (id: string) => {
    mutate({ id, state: JSON.stringify(serializer.export()) });
  };

  return {
    mutate: handleMutate,
    error,
    isPending,
    toastRef,
  };
};

export default useUpdateSnapshot;

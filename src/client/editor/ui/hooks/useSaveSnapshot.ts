import useEditorContext from '@/app/editor/useEditorContext';
import { ServerError } from '@/client/common/components/lib/ErrorMessage';
import { ToastRef } from '@/client/common/components/lib/Toast';
import api from '@/client/common/utils/api';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRef } from 'react';

const useSaveSnapshot = () => {
  const toastRef = useRef<ToastRef>();

  const { exporter } = useEditorContext();

  const { mutate, error, isPending } = useMutation<unknown, AxiosError<ServerError>, { name: string; state: string }>({
    mutationFn: async (data) => {
      const resp = await api.post('/api/snapshots', data);
      return resp;
    },
    onSuccess() {
      toastRef.current?.execute('Data saved successfully.');
    },
  });

  const handleMutate = (name: string) => {
    mutate({ name, state: JSON.stringify(exporter.export()) });
  };

  return {
    mutate: handleMutate,
    error,
    isPending,
    toastRef,
  };
};

export default useSaveSnapshot;

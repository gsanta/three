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

  const { mutate, error, isPending } = useMutation<unknown, AxiosError<ServerError>, unknown>({
    mutationFn: async () => {
      const resp = await api.post('/api/snapshot', { state: JSON.stringify(exporter.export()) });
      return resp;
    },
    onSuccess() {
      toastRef.current?.execute('Data saved successfully.');
    },
  });

  return {
    mutate,
    error,
    isPending,
    toastRef,
  };
};

export default useSaveSnapshot;

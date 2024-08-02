import useEditorContext from '@/app/editor/EditorContext';
import { ServerError } from '@/client/common/components/ErrorMessage';
import api from '@/client/common/utils/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useSaveSnapshot = () => {
  const toast = useToast();
  const { exporter } = useEditorContext();

  const { mutate, error, isPending } = useMutation<unknown, AxiosError<ServerError>, unknown>({
    mutationFn: async () => {
      const resp = await api.post('/api/snapshot', { state: JSON.stringify(exporter.export()) });
      return resp;
    },
    onSuccess() {
      toast({ position: 'top', title: 'Data saved successfully.' });
    },
  });

  return {
    mutate,
    error,
    isPending,
  };
};

export default useSaveSnapshot;

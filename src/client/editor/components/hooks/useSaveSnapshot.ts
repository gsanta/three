import { ServerError } from '@/client/common/components/ErrorMessage';
import { useAppSelector } from '@/client/common/hooks/hooks';
import api from '@/client/common/utils/api';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const useSaveSnapshot = () => {
  const toast = useToast();
  const blockState = useAppSelector((selector) => selector.block.present);

  const { mutate, error, isPending } = useMutation<unknown, AxiosError<ServerError>, unknown>({
    mutationFn: async () => {
      const resp = await api.post('/api/snapshot', { state: JSON.stringify(blockState) });
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

import { useAppSelector } from '@/hooks';
import api from '@/utils/api';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

type CreateDrawingRequest = {
  title: string;
  content: string;
};

const useSaveDrawing = () => {
  const { editor } = useAppSelector((state) => state.editor);

  const { mutate, isLoading } = useMutation<unknown, AxiosError<unknown>, CreateDrawingRequest>(async (data) => {
    const resp = await api.post('/drawings', {
      ...data,
    });

    return resp;
  });

  const handleSave = () => {
    const document = editor?.exportDocument();
    mutate({
      title: 'test drawing',
      content: document,
    });
  };

  return {
    save: handleSave,
    isLoading: isLoading,
  };
};

export default useSaveDrawing;

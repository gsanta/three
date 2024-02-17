import React from 'react';
import Dialog, { DialogProps, DialogBody, DialogFooter } from '../../../common/components/Dialog';
import { Alert, AlertIcon, Button } from '@chakra-ui/react';
import api from '@/common/utils/api';
import { useAppSelector } from '@/common/hooks/hooks';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';

type DrawingResponse = {
  title: string;
  content: string;
};

const LoadDrawingDialog = ({ isOpen, onClose }: Omit<DialogProps, 'title' | 'children'>) => {
  const { editor } = useAppSelector((state) => state.editor);

  const { refetch, isError, isLoading, remove } = useQuery<AxiosResponse<DrawingResponse[]>, unknown>(
    'drawings',
    () => api.get('drawings'),
    {
      enabled: false,
      onSuccess(d) {
        editor.importDocument(d?.data[0].content);
        onClose();
      },
    },
  );

  const handleClose = () => {
    remove();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Import">
      <DialogBody>
        {isError && (
          <Alert status="error" variant="left-accent">
            <AlertIcon />
            There was an error processing your request
          </Alert>
        )}
      </DialogBody>
      <DialogFooter>
        <Button size="sm" onClick={handleClose}>
          Cancel
        </Button>
        <Button size="sm" colorScheme="orange" onClick={() => refetch()} isLoading={isLoading}>
          Load
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default LoadDrawingDialog;

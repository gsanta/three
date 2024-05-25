import Dialog, { DialogBody } from '../../common/components/Dialog';
import api from '../../common/utils/api';
import { usersPath } from '../../common/utils/routes';
import { Avatar, Box, Button, ButtonGroup, FormControl, FormErrorMessage, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';

type UserDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

const UserDialog = ({ isOpen, onClose }: UserDialogProps) => {
  const { data } = useSession();

  const {
    mutateAsync: mutateDeleteUser,
    isError: isDeleteUserError,
    isPending: isDeleteUserLoading,
  } = useMutation<unknown, AxiosError<unknown>, unknown>({
    mutationFn: async () => {
      const resp = await api.delete(usersPath);

      return resp;
    },
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="User">
      <DialogBody padding="1rem">
        <Box display="flex" justifyContent="center" gap="1rem" alignItems="center">
          <Avatar name={data?.user?.email || ''} /> <Text maxW="200px">{data?.user?.email}</Text>
        </Box>
        <ButtonGroup display="flex" justifyContent="space-around" marginTop="1rem">
          <FormControl isInvalid={isDeleteUserError} width="initial">
            <Button colorScheme="red" onClick={mutateDeleteUser} isLoading={isDeleteUserLoading}>
              Delete account
            </Button>
            <FormErrorMessage>Failed to delete user</FormErrorMessage>
          </FormControl>
        </ButtonGroup>
      </DialogBody>
    </Dialog>
  );
};

export default UserDialog;

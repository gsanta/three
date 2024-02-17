import Dialog, { DialogBody } from '../../../common/components/Dialog';
import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks';
import api from '@/common/utils/api';
import { usersPath } from '@/common/utils/routes';
import { Avatar, Box, Button, ButtonGroup, FormControl, FormErrorMessage, Text } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import React from 'react';
import { useMutation } from 'react-query';
import { signOut } from '../userSlice';

type UserDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

const UserDialog = ({ isOpen, onClose }: UserDialogProps) => {
  const email = useAppSelector((state) => state.user.email);
  const dispatch = useAppDispatch();

  const {
    mutateAsync: mutateDeleteUser,
    isError: isDeleteUserError,
    isLoading: isDeleteUserLoading,
  } = useMutation<unknown, AxiosError<unknown>, unknown>(
    async () => {
      const resp = await api.delete(usersPath);

      return resp;
    },
    {
      onSuccess: () => {
        dispatch(signOut());
        onClose();
      },
    },
  );

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="User">
      <DialogBody padding="1rem">
        <Box display="flex" justifyContent="center" gap="1rem" alignItems="center">
          <Avatar name="Dan Abrahmov" /> <Text maxW="200px">{email}</Text>
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

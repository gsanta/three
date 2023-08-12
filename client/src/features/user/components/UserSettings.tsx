import { signOut } from '@/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Avatar, Button, ButtonGroup, useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react';
import RegistrationDialog from './RegistrationDialog';
import LoginDialog from './LoginDialog';
import UserDialog from './UserDialog';
import { useMutation } from 'react-query';
import api from '@/utils/api';

const UserSettings = () => {
  const toast = useToast();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();

  const { isOpen: isSignInDialogOpen, onOpen: onSignInDialogOpen, onClose: onSignInDialogClose } = useDisclosure();
  const { isOpen: isSignUpDialogOpen, onOpen: onSignUpDialogOpen, onClose: onSignUpDialogClose } = useDisclosure();
  const { isOpen: isUserDialogOpen, onOpen: onUserDialogOpen, onClose: onUserDialogClose } = useDisclosure();

  const { mutate: logOut } = useMutation(() => api.delete('/users/sign_out'), {
    onSuccess() {
      dispatch(signOut());
      toast({
        title: 'Logged out successfully',
        position: 'top',
      });
    },
    onError() {
      toast({
        title: 'Failed to log out',
        position: 'top',
      });
    },
  });

  return (
    <>
      {isLoggedIn ? (
        <ButtonGroup>
          <Button size="sm" variant="ghost" onClick={onUserDialogOpen}>
            <Avatar name="Dan Abrahmov" size="sm" />
          </Button>
          <Button size="sm" onClick={() => logOut()}>
            Log out
          </Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup>
          <Button size="sm" onClick={onSignInDialogOpen}>
            Log in
          </Button>
          <Button size="sm" onClick={onSignUpDialogOpen}>
            Sign up
          </Button>
        </ButtonGroup>
      )}
      <LoginDialog isOpen={isSignInDialogOpen} onClose={onSignInDialogClose} />
      <RegistrationDialog isOpen={isSignUpDialogOpen} onClose={onSignUpDialogClose} />
      <UserDialog isOpen={isUserDialogOpen} onClose={onUserDialogClose} />
    </>
  );
};

export default UserSettings;

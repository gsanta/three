import { signOut } from '@/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Avatar, Button, ButtonGroup, useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react';
import SignUpDialog from './SignUpDialog';
import SignInDialog from './SignInDialog';
import UserDialog from './UserDialog';

const UserSettings = () => {
  const toast = useToast();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();

  const { isOpen: isSignInDialogOpen, onOpen: onSignInDialogOpen, onClose: onSignInDialogClose } = useDisclosure();
  const { isOpen: isSignUpDialogOpen, onOpen: onSignUpDialogOpen, onClose: onSignUpDialogClose } = useDisclosure();
  const { isOpen: isUserDialogOpen, onOpen: onUserDialogOpen, onClose: onUserDialogClose } = useDisclosure();

  const logOut = async () => {
    try {
      await fetch('/users/sign_out', {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });
      dispatch(signOut());
      toast({
        title: 'Logged out successfully',
        position: 'top',
      });
    } catch (e) {}
  };

  return (
    <>
      {isLoggedIn ? (
        <ButtonGroup>
          <Button size="sm" variant="ghost" onClick={onUserDialogOpen}>
            <Avatar name="Dan Abrahmov" size="sm" />
          </Button>
          <Button size="sm" onClick={logOut}>
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
      <SignInDialog isOpen={isSignInDialogOpen} onClose={onSignInDialogClose} />
      <SignUpDialog isOpen={isSignUpDialogOpen} onClose={onSignUpDialogClose} />
      <UserDialog isOpen={isUserDialogOpen} onClose={onUserDialogClose} />
    </>
  );
};

export default UserSettings;

import { useAppSelector } from '@/hooks';
import { Button, useToast } from '@chakra-ui/react';
import React from 'react';

const Login = () => {
  const toast = useToast();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const logOut = async () => {
    try {
      await fetch('/users/sign_out', {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });
      toast({
        title: 'Logged out successfully',
        position: 'top',
      });
    } catch (e) {}
  };

  return isLoggedIn ? (
    <Button size="sm" onClick={logOut}>
      Log out
    </Button>
  ) : (
    <Button size="sm">Log in</Button>
  );
};

export default Login;

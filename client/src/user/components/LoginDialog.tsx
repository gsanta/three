import Dialog, { DialogBody, DialogButtons, DialogFooter } from '../../common/components/Dialog';
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box } from '@chakra-ui/react';
import React from 'react';
import ErrorMessage from '../../common/components/ErrorMessage';
import useEmailLogin from '../hooks/useEmailLogin';
import { signIn } from 'next-auth/react';

type LoginDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

const LoginDialog = ({ isOpen, onClose }: LoginDialogProps) => {
  const {
    form: { handleSubmit, formErrors, register, reset: resetForm },
    query: { loginEmail, loginEmailError, isLoginEmailLoding },
  } = useEmailLogin({
    onClose,
  });

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Log in">
      <form onSubmit={handleSubmit(loginEmail)}>
        <DialogBody display="flex" flexDir="column" gap="1rem">
          <FormControl isInvalid={Boolean(formErrors.email)}>
            <FormLabel>Email</FormLabel>
            <Input {...register('email')} />
            <FormErrorMessage>{formErrors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(formErrors.password)}>
            <FormLabel>Password</FormLabel>
            <Input type="password" {...register('password')} />
            <FormErrorMessage>{formErrors.password?.message}</FormErrorMessage>
          </FormControl>
          <Box display="flex" marginTop="4" justifyContent="space-around">
            <Button onClick={() => signIn('google')}>Log in with google</Button>
          </Box>
          {loginEmailError && (
            <ErrorMessage
              error={loginEmailError}
              fallbackMessage={
                loginEmailError?.response?.status === 401 ? 'Invalid email or password' : 'Failed to log in'
              }
            />
          )}
        </DialogBody>
        <DialogFooter>
          <DialogButtons>
            <Button size="sm" onClick={handleClose} isDisabled={isLoginEmailLoding}>
              Close
            </Button>
            <Button size="sm" colorScheme="orange" type="submit" isLoading={isLoginEmailLoding}>
              Log in
            </Button>
          </DialogButtons>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default LoginDialog;

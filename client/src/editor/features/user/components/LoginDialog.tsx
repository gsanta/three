import Dialog, { DialogBody, DialogButtons, DialogFooter } from '../../../../common/components/Dialog';
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box } from '@chakra-ui/react';
import React from 'react';
import { emailRegex } from '../utils/userUtils';
import ErrorMessage from '../../../../common/components/ErrorMessage';
import useEmailLogin from '../hooks/useEmailLogin';
import useGoogleLogin from '../hooks/useGoogleLogin';

type LoginDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

const LoginDialog = ({ isOpen, onClose }: LoginDialogProps) => {
  const { loginGooglError, isLoginGoogleLoading, loginGoogleReset } = useGoogleLogin({
    onClose,
  });

  const {
    form: { handleSubmit, formErrors, register, reset: resetForm },
    query: { loginEmail, loginEmailError, isLoginEmailLoding },
  } = useEmailLogin({
    onClose,
    resetLogin: loginGoogleReset,
  });

  const handleClose = () => {
    loginGoogleReset();
    resetForm();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Log in">
      <form onSubmit={handleSubmit(loginEmail)}>
        <DialogBody>
          <FormControl isInvalid={Boolean(formErrors.email)}>
            <FormLabel>Email</FormLabel>
            <Input
              {...register('email', {
                required: {
                  value: true,
                  message: 'Please enter your email address',
                },
                pattern: {
                  value: emailRegex,
                  message: 'Invalid email address',
                },
              })}
            />
            <FormErrorMessage>{formErrors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" {...register('password')} />
          </FormControl>
          <Box display="flex" marginTop="4" justifyContent="space-around">
            {/* <GoogleLogin onLogin={loginGoogle} /> */}
          </Box>
          {loginEmailError && (
            <ErrorMessage
              error={loginEmailError}
              fallbackMessage={
                loginEmailError?.response?.status === 401 ? 'Invalid email or password' : 'Failed to log in'
              }
            />
          )}
          {loginGooglError && <ErrorMessage error={loginGooglError} />}
        </DialogBody>
        <DialogFooter>
          <DialogButtons>
            <Button size="sm" onClick={handleClose} isDisabled={isLoginEmailLoding || isLoginGoogleLoading}>
              Close
            </Button>
            <Button size="sm" colorScheme="orange" type="submit" isLoading={isLoginEmailLoding || isLoginGoogleLoading}>
              Log in
            </Button>
          </DialogButtons>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default LoginDialog;

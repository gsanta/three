import Dialog, { DialogBody, DialogButtons, DialogFooter } from '../../common/components/Dialog';
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box } from '@chakra-ui/react';
import React from 'react';
import useEmailSignUp from '../hooks/useEmailSignUp';
import ErrorMessage from '../../common/components/ErrorMessage';

type SignUpDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

const SignUpDialog = ({ isOpen, onClose }: SignUpDialogProps) => {
  const {
    form: { handleSubmit, formErrors, register, reset },
    query: { registerEmail, registerEmailError, isRegisterEmailLoading },
  } = useEmailSignUp({ onClose });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Sign up">
      <form onSubmit={handleSubmit(registerEmail)}>
        <DialogBody display="flex" flexDirection="column" gap="1rem">
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
          <FormControl isInvalid={Boolean(formErrors.passwordConfirmation)}>
            <FormLabel>Password Confirmation</FormLabel>
            <Input type="password" {...register('passwordConfirmation')} />
            <FormErrorMessage>{formErrors.passwordConfirmation?.message}</FormErrorMessage>
          </FormControl>
          <Box display="flex" marginTop="4" justifyContent="space-around">
            {/* <GoogleLogin onLogin={loginGoogle} /> */}
          </Box>
          {registerEmailError && (
            <ErrorMessage
              error={registerEmailError}
              fallbackMessage={
                registerEmailError?.response?.status === 401 ? 'Invalid email or password' : 'Failed to log in'
              }
            />
          )}
        </DialogBody>
        <DialogFooter>
          <DialogButtons>
            <Button size="sm" onClick={handleClose} isDisabled={isRegisterEmailLoading}>
              Close
            </Button>
            <Button size="sm" colorScheme="orange" type="submit" isLoading={isRegisterEmailLoading}>
              Sign Up
            </Button>
          </DialogButtons>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default SignUpDialog;

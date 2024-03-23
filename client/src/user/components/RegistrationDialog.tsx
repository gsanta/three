import Dialog, { DialogBody, DialogButtons, DialogFooter } from '../../common/components/Dialog';
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box } from '@chakra-ui/react';
import React from 'react';
import { emailRegex } from '../utils/userUtils';
import useEmailRegistration from '../hooks/useEmailRegistration';
import useGoogleLogin from '../hooks/useGoogleLogin';
import ErrorMessage from '../../common/components/ErrorMessage';

type RegistrationDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

const RegistrationDialog = ({ isOpen, onClose }: RegistrationDialogProps) => {
  const { loginGooglError, isLoginGoogleLoading, loginGoogleReset } = useGoogleLogin({
    onClose,
  });

  const {
    form: { handleSubmit, formErrors, register, watch, reset },
    query: { registerEmail, registerEmailError, isRegisterEmailLoading },
  } = useEmailRegistration({ onClose, resetLogin: loginGoogleReset });

  const handleClose = () => {
    reset();
    loginGoogleReset();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Sign up">
      <form onSubmit={handleSubmit(registerEmail)}>
        <DialogBody>
          <FormControl isInvalid={Boolean(formErrors.email)}>
            <FormLabel>Email</FormLabel>
            <Input
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required',
                },
                pattern: {
                  value: emailRegex,
                  message: 'Invalid email address',
                },
              })}
            />
            <FormErrorMessage>{formErrors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(formErrors.password)}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required',
                },
              })}
            />
          </FormControl>
          <FormControl isInvalid={Boolean(formErrors.password_confirmation)}>
            <FormLabel>Password Confirmation</FormLabel>
            <Input
              type="password"
              {...register('password_confirmation', {
                required: {
                  value: true,
                  message: 'Password confirmation is required',
                },
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return 'Your passwords do no match';
                  }
                  return undefined;
                },
              })}
            />
            <FormErrorMessage>{formErrors.password_confirmation?.message}</FormErrorMessage>
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
          {loginGooglError && <ErrorMessage error={loginGooglError} />}
        </DialogBody>
        <DialogFooter>
          <DialogButtons>
            <Button size="sm" onClick={handleClose} isDisabled={isRegisterEmailLoading || isLoginGoogleLoading}>
              Close
            </Button>
            <Button
              size="sm"
              colorScheme="orange"
              type="submit"
              isLoading={isRegisterEmailLoading || isLoginGoogleLoading}
            >
              Sign Up
            </Button>
          </DialogButtons>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default RegistrationDialog;

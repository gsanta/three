import { setUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/hooks';
import Dialog, { DialogBody, DialogButtons } from '@/components/dialog/Dialog';
import api from '@/utils/api';
import { usersPath } from '@/utils/routes';
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Text } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { emailRegex } from '../utils/userUtils';

type SignUpDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

type SignUpRequestData = {
  email: string;
  password: string;
  password_confirmation: string;
};

const SignUpDialog = ({ isOpen, onClose }: SignUpDialogProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
    watch,
  } = useForm<SignUpRequestData>({
    defaultValues: {
      email: '',
      password: '',
      password_confirmation: '',
    },
    mode: 'onTouched',
  });

  const {
    mutateAsync: mutateSignUp,
    isError: isSignUpError,
    isLoading: isSignUpLoading,
    error: signUpError,
  } = useMutation<unknown, AxiosError<unknown>, SignUpRequestData>(
    async (data) => {
      const resp = await api.post(usersPath, {
        user: data,
      });

      return resp;
    },
    {
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const onSubmit = async (data: SignUpRequestData) => {
    await mutateSignUp(data);
    dispatch(setUser({ isLoggedIn: true, email: data.email }));
    handleClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Sign up">
      <DialogBody as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.email)}>
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
            autoFocus
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.password)}>
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
        <FormControl isInvalid={Boolean(errors.password_confirmation)}>
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
          <FormErrorMessage>{errors.password_confirmation?.message}</FormErrorMessage>
        </FormControl>
        {isSignUpError && (
          <Text color="red.300" fontSize="sm">
            {signUpError?.response?.statusText}
          </Text>
        )}
        <DialogButtons>
          <Button size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button size="sm" colorScheme="orange" type="submit" isLoading={isSignUpLoading}>
            Sign Up
          </Button>
        </DialogButtons>
      </DialogBody>
    </Dialog>
  );
};

export default SignUpDialog;

import apiInstance from '@/api/apiInstance';
import { loginPath } from '@/apiRoutes';
import DataContext from '@/ui/DataContext';
import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import LoginRequest from './types/LoginRequest';
import LoginResponse from './types/LoginResponse';

const useLogin = (onLogin: () => void) => {
  const { userStore } = useContext(DataContext);
  const { handleSubmit, register, reset } = useForm<{ email: string; password: string }>();

  const emailProps = register('email', {
    required: 'Email is required.',
  });

  const passwordProps = register('password', {
    required: 'Password is required.',
  });

  const { mutate, isError, isLoading, isSuccess } = useMutation<AxiosResponse<LoginResponse>, unknown, LoginRequest>(
    async ({ user: { email, password } }: LoginRequest) =>
      apiInstance.post(loginPath(), {
        user: {
          email,
          password,
        },
      }),
    {
      onSuccess({ data }) {
        reset();
        if (userStore) {
          userStore.email = data.email;
        }
        onLogin();
      },
    },
  );

  const login = handleSubmit((data) => {
    try {
      mutate({ user: data });
    } catch (e) {
      // handle your error state here
    }
  });

  return {
    isError,
    isSuccess,
    isLoading,
    login,
    emailProps,
    passwordProps,
    reset,
  };
};

export default useLogin;

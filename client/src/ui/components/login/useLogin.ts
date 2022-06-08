import apiInstance from '@/apiInstance';
import { loginPath } from '@/apiRoutes';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const useLogin = (onLogin: (token: string) => void) => {
  const { handleSubmit, register, reset } = useForm<{ email: string; password: string }>();

  const emailProps = register('email', {
    required: 'Email is required.',
  });

  const passwordProps = register('password', {
    required: 'Password is required.',
  });

  const { mutate, isError, isLoading } = useMutation(
    async ({ email, password }: { email: string; password: string }) =>
      apiInstance.post(loginPath(), {
        user: {
          email,
          password,
        },
      }),
    {
      onSuccess(data) {
        reset();
        const token = data?.headers?.authorization?.split(' ')[1];
        onLogin(token);
      },
    },
  );

  const login = handleSubmit((data) => {
    try {
      mutate(data);
    } catch (e) {
      // handle your error state here
    }
  });

  return {
    isError,
    isLoading,
    login,
    emailProps,
    passwordProps,
    reset,
  };
};

export default useLogin;

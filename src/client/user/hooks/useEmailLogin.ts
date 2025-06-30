import { ServerError } from '../../common/components/lib/ErrorMessage';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '@/common/validations/LoginSchema';
import { useMutation } from '@tanstack/react-query';

const useEmailLogin = () => {
  const { update } = useSession();

  const {
    clearErrors,
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm<LoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const {
    mutateAsync,
    error,
    isPending,
    reset: resetMutation,
  } = useMutation<unknown, AxiosError<ServerError>, LoginSchema>({
    mutationFn: async ({ email, password }) => {
      const resp = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (resp?.status === 401) {
        throw new AxiosError<ServerError>('Invalid email or password', 'ERR_INVALID_CREDENTIALS');
      }

      await update();

      return resp;
    },
  });

  const handleReset = useCallback(() => {
    reset();
    clearErrors();
    resetMutation();
  }, [clearErrors, reset, resetMutation]);

  return {
    query: {
      loginEmail: mutateAsync,
      loginEmailError: error,
      isLoginEmailLoding: isPending,
    },
    form: {
      register,
      handleSubmit,
      reset: handleReset,
      formErrors,
    },
  };
};

export default useEmailLogin;

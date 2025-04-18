import { ServerError } from '../../common/components/ErrorMessage';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '@/common/validations/LoginSchema';
import { useMutation } from '@tanstack/react-query';

type UseEmailLoginProps = {
  onClose(): void;
};

const useEmailLogin = ({ onClose }: UseEmailLoginProps) => {
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
    mode: 'onSubmit',
  });

  const { mutate, error, isPending } = useMutation<unknown, AxiosError<ServerError>, LoginSchema>({
    mutationFn: async ({ email, password }) => {
      const resp = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      return resp;
    },
    onSuccess() {
      onClose();
      reset({
        email: '',
        password: '',
      });
    },
  });

  const loginEmail = useCallback(
    async (data: LoginSchema) => {
      mutate(data);
    },
    [mutate],
  );

  const handleReset = useCallback(() => {
    reset();
    clearErrors();
  }, [clearErrors, reset]);

  return {
    query: {
      loginEmail,
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

import { ServerError } from '../../common/components/ErrorMessage';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { setUser } from '../userSlice';
import { useAppDispatch } from '../../common/hooks/hooks';
import { useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '@/schemas/LoginSchema';

type UseEmailLoginProps = {
  onClose(): void;
};

const useEmailLogin = ({ onClose }: UseEmailLoginProps) => {
  const dispatch = useAppDispatch();

  const { mutate, error, isLoading } = useMutation<unknown, AxiosError<ServerError>, LoginSchema>(
    async ({ email, password }) => {
      const resp = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      return resp;
    },
    {
      onSuccess(_, variables) {
        dispatch(setUser({ isLoggedIn: true, email: variables.email }));
        onClose();
      },
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const loginEmail = useCallback(
    async (data: LoginSchema) => {
      mutate(data);
    },
    [mutate],
  );

  return {
    query: {
      loginEmail,
      loginEmailError: error,
      isLoginEmailLoding: isLoading,
    },
    form: {
      register,
      handleSubmit,
      reset,
      formErrors,
    },
  };
};

export default useEmailLogin;

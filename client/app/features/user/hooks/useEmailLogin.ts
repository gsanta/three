import { ServerError } from '../../../common/components/ErrorMessage';
import api from '@/common/utils/api';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { setUser } from '../userSlice';
import { useAppDispatch } from '@/common/hooks/hooks';
import { useCallback } from 'react';

type LoginRequestData = {
  email: string;
  password: string;
};

type UseEmailLoginProps = {
  onClose(): void;
  resetLogin(): void;
};

const useEmailLogin = ({ onClose, resetLogin }: UseEmailLoginProps) => {
  const dispatch = useAppDispatch();

  const { mutate, error, isLoading } = useMutation<unknown, AxiosError<ServerError>, LoginRequestData>(
    async (data) => {
      const resp = await api.post('/users/sign_in', {
        user: data,
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
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const loginEmail = useCallback(
    async (data: LoginRequestData) => {
      resetLogin();
      mutate(data);
    },
    [mutate, resetLogin],
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

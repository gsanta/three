import { useAppDispatch } from '../../common/hooks/hooks';
import api from '../../common/utils/api';
import { usersPath } from '../../common/utils/routes';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { setUser } from '../userSlice';
import { useCallback } from 'react';
import { ServerError } from '../../common/components/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, registerSchema } from '@/common/validations/RegisterSchema';

type UseEmailRegistrationProps = {
  onClose(): void;
  resetLogin(): void;
};

const useEmailRegistration = ({ onClose, resetLogin }: UseEmailRegistrationProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    watch,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onTouched',
  });

  const { mutate, isLoading, error } = useMutation<unknown, AxiosError<ServerError>, RegisterSchema>(
    async (data) => {
      const resp = await api.post(usersPath, data);

      return resp;
    },
    {
      onSuccess(_, variables) {
        dispatch(setUser({ isLoggedIn: true, email: variables.email }));
        onClose();
      },
    },
  );

  const handleRegistration = useCallback(
    (data: RegisterSchema) => {
      resetLogin();
      reset();
      mutate(data);
    },
    [mutate, resetLogin, reset],
  );

  return {
    query: {
      registerEmail: handleRegistration,
      registerEmailError: error,
      isRegisterEmailLoading: isLoading,
    },
    form: {
      register,
      handleSubmit,
      reset,
      formErrors,
      watch,
    },
  };
};

export default useEmailRegistration;

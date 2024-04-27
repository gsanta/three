import api from '../../common/utils/api';
import { usersPath } from '../../common/utils/routes';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useCallback } from 'react';
import { ServerError } from '../../common/components/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, registerSchema } from '@/common/validations/RegisterSchema';

type UseEmailSignUpProps = {
  onClose(): void;
};

const useEmailSignUp = ({ onClose }: UseEmailSignUpProps) => {
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
      onSuccess() {
        onClose();
      },
    },
  );

  const handleRegistration = useCallback(
    (data: RegisterSchema) => {
      reset();
      mutate(data);
    },
    [mutate, reset],
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

export default useEmailSignUp;

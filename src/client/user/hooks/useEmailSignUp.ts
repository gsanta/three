import api from '../../common/utils/api';
import { userPath } from '../../common/utils/routes';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { ServerError } from '../../common/components/lib/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, registerSchema } from '@/common/validations/RegisterSchema';
import { useMutation } from '@tanstack/react-query';

const useEmailSignUp = () => {
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
  });

  const { mutateAsync, isPending, error } = useMutation<unknown, AxiosError<ServerError>, RegisterSchema>({
    mutationFn: async (data) => {
      const resp = await api.post(userPath, data);

      return resp;
    },
  });

  return {
    query: {
      registerEmail: mutateAsync,
      registerEmailError: error,
      isRegisterEmailLoading: isPending,
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

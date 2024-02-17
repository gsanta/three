import { ServerError } from '../../../common/components/ErrorMessage';
import { useAppDispatch } from '@/common/hooks/hooks';
import api from '@/common/utils/api';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { setUser } from '../userSlice';
import { useCallback } from 'react';

type GoogleLoginResponse = {
  id: number;
  email: string;
};

type UseGoogleLoginProps = {
  onClose(): void;
};

export const useGoogleLogin = ({ onClose }: UseGoogleLoginProps) => {
  const dispatch = useAppDispatch();

  const { mutate, error, isLoading, reset } = useMutation<GoogleLoginResponse, AxiosError<ServerError>, string>(
    (credential) =>
      api.post('/users/sign_in/google', undefined, {
        headers: {
          Authorization: `Bearer ${credential}`,
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess(data) {
        dispatch(setUser({ isLoggedIn: true, email: data.email }));
        onClose();
      },
    },
  );

  const loginGoogle = useCallback((credential: string) => mutate(credential), [mutate]);

  return {
    loginGoogle,
    loginGooglError: error,
    isLoginGoogleLoading: isLoading,
    loginGoogleReset: reset,
  };
};

export default useGoogleLogin;

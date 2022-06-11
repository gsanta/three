import apiInstance from "@/api/apiInstance";
import { signUpPath } from "@/apiRoutes";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import SignUpRequest from "./types/SignUpRequest";

const useSignup = (onSignUp: (token: string) => void) => {
  const { handleSubmit, register, reset } = useForm<SignUpRequest>();

  const emailProps = register('email', {
    required: 'Email is required.',
  });

  const passwordProps = register('password', {
    required: 'Password is required.',
  });

  const passwordConfirmationProps = register('passwordConfirmation', {
    required: 'Password Confirmation is required.',
  });

  const { mutate, isError, isLoading } = useMutation(
    async ({ email, password, passwordConfirmation }: SignUpRequest) =>
      apiInstance.post(signUpPath(), {
        user: {
          email,
          password,
          passwordConfirmation: passwordConfirmation,
        },
      }),
    {
      onSuccess(data) {
        reset();
        const token = data?.headers?.authorization?.split(' ')[1];
        onSignUp(token);
      },
    },
  );

  const signUp = handleSubmit((data) => {
    try {
      mutate(data);
    } catch (e) {
      // handle your error state here
    }
  });

  return {
    isError,
    isLoading,
    signUp,
    emailProps,
    passwordProps,
    passwordConfirmationProps,
    reset,
  }
}

export default useSignup;

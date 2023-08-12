import { Alert } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import React from 'react';

const knownErrorCodes = ['ERR_INVALID_CREDENTIALS'];

export type ServerError = {
  code?: string;
  message: string;
};

type ErrorMessageProps = {
  error: AxiosError<ServerError>;
  fallbackMessage?: string;
};

const ErrorMessage = ({ error, fallbackMessage }: ErrorMessageProps) => {
  const code = error.response?.data.code;
  const message = error.response?.data.message;
  return (
    <Alert status="error">
      {knownErrorCodes.includes(code || '') ? message : fallbackMessage || 'Unexpected error'}
    </Alert>
  );
};

export default ErrorMessage;

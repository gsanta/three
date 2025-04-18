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
    <div role="alert" className="alert alert-warning">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span>{knownErrorCodes.includes(code || '') ? message : fallbackMessage || 'Unexpected error'}</span>
    </div>
  );
};

export default ErrorMessage;

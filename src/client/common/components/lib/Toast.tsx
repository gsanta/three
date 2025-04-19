import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

export type ToastRef = { execute: (message: string) => void } | undefined;

const Toast = forwardRef<ToastRef>(({}, ref) => {
  const [message, setMessage] = useState('');

  useImperativeHandle(
    ref,
    () => ({
      execute: setMessage,
    }),
    [],
  );

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(''), 1000);
    }
  }, [message]);

  return message ? (
    <div className="toast toast-top toast-right">
      <div className="alert alert-info">
        <span>{message}</span>
      </div>
    </div>
  ) : null;
});

export default Toast;

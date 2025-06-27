import React from 'react';
import ErrorMessage, { ServerError } from './lib/ErrorMessage';
import { AxiosError } from 'axios';

export type DialogProps = {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  error?: AxiosError<ServerError> | null;
  errorMessageFallback?: string;
  leftAction?: React.ReactNode;
  id: string;
  isSubmitDisabled?: boolean;
  isSubmitLoading?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
  title: string;
};

const Dialog = ({
  id,
  children,
  error,
  errorMessageFallback,
  onSubmit,
  isSubmitLoading,
  isSubmitDisabled,
  leftAction,
  onClose,
  submitLabel,
  title,
}: DialogProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  const content = (
    <>
      <h3 className="divider font-bold text-lg">{title}</h3>
      {children}
      {error && <ErrorMessage error={error} fallbackMessage={errorMessageFallback} />}
      {(leftAction || onClose || submitLabel) && (
        <>
          <h3 className="divider font-bold text-lg mb-0" />

          <fieldset className="modal-action fieldset flex justify-between mt-2">
            {leftAction}
            {(onClose || submitLabel) && (
              <div className="flex gap-2">
                {onClose && (
                  <button className={`btn justify-self-end	 ${isSubmitLoading ? 'btn-disabled' : ''}`} onClick={onClose}>
                    Close
                  </button>
                )}
                {submitLabel && (
                  <button
                    className={`btn btn-warning justify-self-end	 ${isSubmitDisabled ? 'btn-disabled' : ''}`}
                    type="submit"
                  >
                    {isSubmitLoading ? <span className="loading loading-spinner" /> : submitLabel}
                  </button>
                )}
              </div>
            )}
          </fieldset>
        </>
      )}
    </>
  );

  return (
    <dialog id={id} className="modal">
      {onSubmit ? (
        <form className="modal-box" onSubmit={handleSubmit}>
          {content}
        </form>
      ) : (
        <div className="modal-box">{content}</div>
      )}
    </dialog>
  );
};

export default Dialog;

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
  hasBackdrop?: boolean;
  id: string;
  isSubmitDisabled?: boolean;
  isSubmitLoading?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  placement?: 'modal-bottom' | 'modal-top' | 'modal-middle';
  size?: 'sm' | 'md';
  submitLabel?: string;
  title: string;
};

const Dialog = ({
  id,
  isOpen,
  children,
  error,
  errorMessageFallback,
  hasBackdrop = true,
  onSubmit,
  isSubmitLoading,
  isSubmitDisabled,
  leftAction,
  onClose,
  placement = 'modal-middle',
  size = 'md',
  submitLabel,
  title,
}: DialogProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
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

          <fieldset className={`modal-action fieldset flex ${leftAction ? 'justify-between' : 'justify-end'} mt-2`}>
            {leftAction}
            {(onClose || submitLabel) && (
              <div className="flex gap-2">
                {onClose && (
                  <button
                    className={`btn justify-self-end	 ${isSubmitLoading ? 'btn-disabled' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                    }}
                  >
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

  return hasBackdrop ? (
    <dialog id={id} className={`modal ${placement}`}>
      {onSubmit ? (
        <form className={`modal-box m-auto max-w-[${size === 'md' ? '50rem' : '25rem'}]`} onSubmit={handleSubmit}>
          {content}
        </form>
      ) : (
        <div className={`modal-box mx-auto max-w-[${size === 'md' ? '50rem' : '25rem'}]`}>{content}</div>
      )}
    </dialog>
  ) : (
    <>
      {isOpen && (
        <div
          id={id}
          role="dialog"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] p-4 bg-white rounded-t-xl z-[100]"
        >
          {onSubmit ? (
            <form className="m-auto max-w-[50rem]" onSubmit={handleSubmit}>
              {content}
            </form>
          ) : (
            <div className="mx-auto max-w-[50rem]">{content}</div>
          )}
        </div>
      )}
    </>
  );
};

export default Dialog;

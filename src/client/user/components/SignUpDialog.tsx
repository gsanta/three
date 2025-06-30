import React, { useEffect } from 'react';
import useEmailSignUp from '../hooks/useEmailSignUp';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';

const SignUpDialog = (props: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
  const {
    form: { handleSubmit, formErrors, register, reset },
    query: { registerEmail, registerEmailError, isRegisterEmailLoading },
  } = useEmailSignUp();

  const handleClose = () => {
    reset();
    props.onClose?.();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await registerEmail(data);
      handleClose();
    } catch {
      // stop propagation of error
    }
  });

  useEffect(() => {
    if (props.isOpen) {
      reset();
    }
  }, [props.isOpen, reset]);

  return (
    <Dialog
      {...props}
      error={registerEmailError}
      id="sign-up-dialog"
      isSubmitLoading={isRegisterEmailLoading}
      onClose={handleClose}
      onSubmit={onSubmit}
      submitLabel="Sign up"
      title="Sign up"
    >
      <div className="overflow-x-auto border border-base-content/5 bg-base-100">
        <table className="table table-fixed">
          <tbody>
            <tr>
              <th className="w-[30%]">
                <label htmlFor="email-input">Email</label>
              </th>
              <td>
                <fieldset className="fieldset">
                  <input
                    type="text"
                    className="input"
                    id="email-input"
                    placeholder="Type here"
                    {...register('email')}
                  />
                  {formErrors.email?.message && (
                    <p className="fieldset-label text-error">{formErrors.email?.message}</p>
                  )}
                </fieldset>
              </td>
            </tr>
            <tr>
              <th className="w-[30%]">
                <label htmlFor="password-input">Password</label>
              </th>
              <td>
                <fieldset className="fieldset">
                  <input
                    type="password"
                    className="input"
                    id="password-input"
                    placeholder="Type here"
                    {...register('password')}
                  />
                  {formErrors.password?.message && (
                    <p className="fieldset-label text-error">{formErrors.password?.message}</p>
                  )}
                </fieldset>
              </td>
            </tr>
            <tr>
              <th className="w-[30%]">
                <label htmlFor="password-confirm-input">Password Confirmation</label>
              </th>
              <td>
                <fieldset className="fieldset">
                  <input
                    type="password"
                    className="input"
                    id="password-confirm-input"
                    placeholder="Type here"
                    {...register('passwordConfirmation')}
                  />
                  {formErrors.password?.message && (
                    <p className="fieldset-label text-error">{formErrors.password?.message}</p>
                  )}
                </fieldset>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Dialog>
  );
};

export default SignUpDialog;

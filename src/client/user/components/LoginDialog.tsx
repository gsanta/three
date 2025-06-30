import React, { useEffect } from 'react';
import useEmailLogin from '../hooks/useEmailLogin';
import { signIn } from 'next-auth/react';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';

const LoginDialog = (props: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
  const {
    form: { handleSubmit, formErrors, register, reset: resetForm },
    query: { loginEmail, loginEmailError, isLoginEmailLoding },
  } = useEmailLogin();

  const handleClose = () => {
    resetForm();
    props.onClose?.();
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await loginEmail(data);
      handleClose();
    } catch {
      // stop propagation of error
    }
  });

  useEffect(() => {
    if (props.isOpen) {
      resetForm();
    }
  }, [props.isOpen, resetForm]);

  return (
    <Dialog
      {...props}
      error={loginEmailError}
      id="login-dialog"
      isSubmitLoading={isLoginEmailLoding}
      leftAction={
        <button className="btn btn-accent" onClick={() => signIn('google')}>
          Log in with google
        </button>
      }
      onClose={handleClose}
      onSubmit={onSubmit}
      submitLabel="Log in"
      title="Login"
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
          </tbody>
        </table>
      </div>
    </Dialog>
  );
};

export default LoginDialog;

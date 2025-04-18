import { Box } from '@chakra-ui/react';
import React from 'react';
import ErrorMessage from '../../common/components/ErrorMessage';
import useEmailLogin from '../hooks/useEmailLogin';
import { signIn } from 'next-auth/react';

const LoginDialog = () => {
  const closeDialog = () => {
    const dialog = document.getElementById('login-dialog') as HTMLDialogElement;
    dialog.close();
  };

  const {
    form: { handleSubmit, formErrors, register, reset: resetForm },
    query: { loginEmail, loginEmailError, isLoginEmailLoding },
  } = useEmailLogin({
    onClose: closeDialog,
  });

  const handleClose = () => {
    resetForm();
    closeDialog();
  };

  return (
    <dialog id="login-dialog" className="modal">
      <div className="modal-box bg-base-200" onSubmit={handleSubmit(loginEmail)}>
        <h3 className="text-lg font-bold">Log in</h3>
        <div className="divider" />
        <div className="flex flex-col gap-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input type="text" className="input" placeholder="Type here" {...register('email')} />
            {formErrors.email?.message && <p className="fieldset-label text-error">{formErrors.email?.message}</p>}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="text" className="input" placeholder="Type here" {...register('password')} />
            {formErrors.password?.message && (
              <p className="fieldset-label text-error">{formErrors.password?.message}</p>
            )}
          </fieldset>
          <Box display="flex" marginTop="4" justifyContent="space-around">
            <button className="btn btn-accent" onClick={() => signIn('google')}>
              Log in with google
            </button>
          </Box>
          {loginEmailError && (
            <ErrorMessage
              error={loginEmailError}
              fallbackMessage={
                loginEmailError?.response?.status === 401 ? 'Invalid email or password' : 'Failed to log in'
              }
            />
          )}
        </div>
        <div className="modal-action">
          <button className={`btn ${isLoginEmailLoding ? 'btn-disabled' : ''}`} onClick={handleClose}>
            Close
          </button>
          <form>
            <button className={`btn btn-primary`} type="submit">
              {isLoginEmailLoding ? <span className="loading loading-spinner" /> : `Log in`}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default LoginDialog;

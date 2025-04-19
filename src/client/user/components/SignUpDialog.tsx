import { Box } from '@chakra-ui/react';
import React from 'react';
import useEmailSignUp from '../hooks/useEmailSignUp';
import ErrorMessage from '../../common/components/lib/ErrorMessage';

const SignUpDialog = () => {
  const closeDialog = () => {
    const dialog = document.getElementById('signup-dialog') as HTMLDialogElement;
    dialog.close();
  };

  const {
    form: { handleSubmit, formErrors, register, reset },
    query: { registerEmail, registerEmailError, isRegisterEmailLoading },
  } = useEmailSignUp({ onClose: closeDialog });

  const handleClose = () => {
    reset();
    closeDialog();
  };

  return (
    <dialog id="signup-dialog" className="modal">
      <div className="modal-box bg-base-200">
        <h3 className="text-lg font-bold">Sign up</h3>
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
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password Confirmation</legend>
            <input type="text" className="input" placeholder="Type here" {...register('passwordConfirmation')} />
            {formErrors.passwordConfirmation?.message && (
              <p className="fieldset-label text-error">{formErrors.passwordConfirmation?.message}</p>
            )}
          </fieldset>
          <Box display="flex" marginTop="4" justifyContent="space-around">
            {/* <GoogleLogin onLogin={loginGoogle} /> */}
          </Box>
          {registerEmailError && (
            <ErrorMessage
              error={registerEmailError}
              fallbackMessage={
                registerEmailError?.response?.status === 401 ? 'Invalid email or password' : 'Failed to log in'
              }
            />
          )}
        </div>
        <div className="modal-action">
          <button className={`btn ${isRegisterEmailLoading ? 'btn-disabled' : ''}`} onClick={handleClose}>
            Close
          </button>
          <form onSubmit={handleSubmit(registerEmail)}>
            <button className={`btn btn-primary`} type="submit">
              {isRegisterEmailLoading ? <span className="loading loading-spinner" /> : `Sign up`}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SignUpDialog;

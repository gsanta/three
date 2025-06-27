import React from 'react';
import useEmailLogin from '../hooks/useEmailLogin';
import { signIn } from 'next-auth/react';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';

const LoginDialog = (props: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
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

  const onSubmit = handleSubmit((data) => {
    loginEmail(data);
  });

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
                    type="text"
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

    // <dialog id="login-dialog" className="modal">
    //   <div className="modal-box bg-base-200" onSubmit={handleSubmit(loginEmail)}>
    //     <h3 className="text-lg font-bold">Log in</h3>
    //     <div className="divider" />
    //     <div className="flex flex-col gap-4">
    //       <fieldset className="fieldset">
    //         <legend className="fieldset-legend">Email</legend>
    //         <input type="text" className="input" placeholder="Type here" {...register('email')} />
    //         {formErrors.email?.message && <p className="fieldset-label text-error">{formErrors.email?.message}</p>}
    //       </fieldset>
    //       <fieldset className="fieldset">
    //         <legend className="fieldset-legend">Password</legend>
    //         <input type="text" className="input" placeholder="Type here" {...register('password')} />
    //         {formErrors.password?.message && (
    //           <p className="fieldset-label text-error">{formErrors.password?.message}</p>
    //         )}
    //       </fieldset>
    //       <div className="flex mt-4 justify-around">
    //         <button className="btn btn-accent" onClick={() => signIn('google')}>
    //           Log in with google
    //         </button>
    //       </div>
    //       {loginEmailError && (
    //         <ErrorMessage
    //           error={loginEmailError}
    //           fallbackMessage={
    //             loginEmailError?.response?.status === 401 ? 'Invalid email or password' : 'Failed to log in'
    //           }
    //         />
    //       )}
    //     </div>
    //     <div className="modal-action">
    //       <button className={`btn ${isLoginEmailLoding ? 'btn-disabled' : ''}`} onClick={handleClose}>
    //         Close
    //       </button>
    //       <form>
    //         <button className={`btn btn-primary`} type="submit">
    //           {isLoginEmailLoding ? <span className="loading loading-spinner" /> : `Log in`}
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </dialog>
  );
};

export default LoginDialog;

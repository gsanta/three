import SignUpDialog from './SignUpDialog';
import LoginDialog from './LoginDialog';
import UserDialog from './UserDialog';
import { signOut, useSession } from 'next-auth/react';
import { useRef } from 'react';
import Toast, { ToastRef } from '@/client/common/components/lib/Toast';

const UserSettings = () => {
  const { data: session } = useSession();

  const isLoggedIn = session?.user?.email;

  const toastRef = useRef<ToastRef>();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toastRef.current?.execute('Logged out successfully');
    } catch {
      toastRef.current?.execute('Logged out successfully');
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => {
              const dialog = document.getElementById('user-dialog') as HTMLDialogElement;
              dialog.showModal();
            }}
          >
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-10 rounded-full">
                <span>SY</span>
              </div>
            </div>
          </button>
          <button className="btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            className="btn"
            onClick={() => {
              const dialog = document.getElementById('login-dialog') as HTMLDialogElement;
              dialog.showModal();
            }}
          >
            Log in
          </button>
          <button
            className="btn"
            onClick={() => {
              const dialog = document.getElementById('signup-dialog') as HTMLDialogElement;
              dialog.showModal();
            }}
          >
            Sign up
          </button>
        </div>
      )}
      <LoginDialog />
      <SignUpDialog />
      <UserDialog />
      <Toast ref={toastRef} />
    </>
  );
};

export default UserSettings;

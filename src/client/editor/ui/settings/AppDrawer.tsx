import Button from '@/client/common/components/lib/Button';
import Toast, { ToastRef } from '@/client/common/components/lib/Toast';
import LoginDialog from '@/client/user/components/LoginDialog';
import SignUpDialog from '@/client/user/components/SignUpDialog';
import ProfileDialog from '@/client/user/components/ProfileDialog';
import { useSession, signOut } from 'next-auth/react';
import { useRef } from 'react';
import useDialog from '../hooks/useDialog';

const AppDrawer = () => {
  const { data: session } = useSession();

  const isLoggedIn = session?.user?.email;

  const toastRef = useRef<ToastRef>();

  const {
    isDialogOpen: isProfileDialogOpen,
    onDialogClose: onProfileDialogClose,
    onDialogOpen: onProfileDialogOpen,
  } = useDialog({ dialogId: 'profile-dialog' });

  const {
    isDialogOpen: isLoginDialogOpen,
    onDialogClose: onLoginDialogClose,
    onDialogOpen: onLoginDialogOpen,
  } = useDialog({ dialogId: 'login-dialog' });

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toastRef.current?.execute('Logged out successfully');
    } catch {
      toastRef.current?.execute('Logged out successfully');
    }
  };

  return (
    <div className="drawer drawer-end">
      <input id="app-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" htmlFor="app-drawer">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="app-drawer" aria-label="close sidebar" className="drawer-overlay" />
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-2">
          {isLoggedIn ? (
            <>
              {/* <button
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
              </button> */}
              <li>
                <Button colorScheme="neutral" onClick={onProfileDialogOpen}>
                  Profile
                </Button>
              </li>
              <li>
                <Button onClick={handleLogout}>Log out</Button>
              </li>
            </>
          ) : (
            <ul className="menu bg-base-200 text-base-content min-h-full w-[100%] p-4 flex flex-col gap-2">
              <li>
                <Button colorScheme="neutral" onClick={onLoginDialogOpen}>
                  Log in
                </Button>
              </li>
              <li>
                <Button
                  colorScheme="neutral"
                  onClick={() => {
                    const dialog = document.getElementById('signup-dialog') as HTMLDialogElement;
                    dialog.showModal();
                  }}
                >
                  Sign up
                </Button>
              </li>
            </ul>
          )}
        </ul>
        <LoginDialog isOpen={isLoginDialogOpen} onClose={onLoginDialogClose} />
        <SignUpDialog />
        <ProfileDialog isOpen={isProfileDialogOpen} onClose={onProfileDialogClose} />
        <Toast ref={toastRef} />
      </div>
    </div>
  );
};

export default AppDrawer;

import Button from '@/client/common/components/lib/Button';
import Toast, { ToastRef } from '@/client/common/components/lib/Toast';
import LoginDialog from '@/client/user/components/LoginDialog';
import SignUpDialog from '@/client/user/components/SignUpDialog';
import ProfileDialog from '@/client/user/components/ProfileDialog';
import { useSession, signOut } from 'next-auth/react';
import { useRef } from 'react';
import useDialog from '../hooks/useDialog';
import Icon from '@/client/common/components/lib/Icon';
import useIsLoggedIn from '@/client/common/hooks/useIsLoggedIn';

const AppDrawer = () => {
  const { data: session } = useSession();

  const toastRef = useRef<ToastRef>();

  const isLoggedIn = useIsLoggedIn();

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

  const {
    isDialogOpen: isSignUpDialogOpen,
    onDialogClose: onSignUpDialogClose,
    onDialogOpen: onSignUpDialogOpen,
  } = useDialog({ dialogId: 'sign-up-dialog' });

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toastRef.current?.execute('Logged out successfully');
    } catch {
      toastRef.current?.execute('Logged out successfully');
    }
  };

  return (
    <div className="drawer drawer-end w-[3rem]">
      <input id="app-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" htmlFor="app-drawer">
          {/* <div className="w-10 rounded-full"> */}
          {/* <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            /> */}
          {isLoggedIn ? (
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span className="text-xs uppercase">{session?.user.email?.slice(0, 2)}</span>
              </div>
            </div>
          ) : (
            <Icon name="BiSolidUserCircle" />
          )}
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="app-drawer" aria-label="close sidebar" className="drawer-overlay" />
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-2">
          {isLoggedIn ? (
            <>
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
                <Button colorScheme="neutral" onClick={onSignUpDialogOpen}>
                  Sign up
                </Button>
              </li>
            </ul>
          )}
        </ul>
        <LoginDialog isOpen={isLoginDialogOpen} onClose={onLoginDialogClose} />
        <SignUpDialog isOpen={isSignUpDialogOpen} onClose={onSignUpDialogClose} />
        <ProfileDialog isOpen={isProfileDialogOpen} onClose={onProfileDialogClose} />
        <Toast ref={toastRef} />
      </div>
    </div>
  );
};

export default AppDrawer;

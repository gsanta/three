import { useAppSelector } from '../../common/hooks/hooks';
import { Avatar, Button, ButtonGroup, useDisclosure, useToast } from '@chakra-ui/react';
import SignUpDialog from './SignUpDialog';
import LoginDialog from './LoginDialog';
import UserDialog from './UserDialog';
import { signOut, useSession } from 'next-auth/react';

const UserSettings = () => {
  const toast = useToast();
  const { data: session } = useSession();

  const isLoggedIn = session?.user?.email;

  const { isOpen: isSignInDialogOpen, onOpen: onSignInDialogOpen, onClose: onSignInDialogClose } = useDisclosure();
  const { isOpen: isSignUpDialogOpen, onOpen: onSignUpDialogOpen, onClose: onSignUpDialogClose } = useDisclosure();
  const { isOpen: isUserDialogOpen, onOpen: onUserDialogOpen, onClose: onUserDialogClose } = useDisclosure();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast({
        title: 'Logged out successfully',
        position: 'top',
      });
    } catch {
      toast({
        title: 'Failed to log out',
        position: 'top',
      });
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <ButtonGroup>
          <Button size="sm" variant="ghost" onClick={onUserDialogOpen}>
            <Avatar name="Dan Abrahmov" size="sm" />
          </Button>
          <Button size="sm" onClick={handleLogout}>
            Log out
          </Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup>
          <Button size="sm" onClick={onSignInDialogOpen}>
            Log in
          </Button>
          <Button size="sm" onClick={onSignUpDialogOpen}>
            Sign up
          </Button>
        </ButtonGroup>
      )}
      <LoginDialog isOpen={isSignInDialogOpen} onClose={onSignInDialogClose} />
      <SignUpDialog isOpen={isSignUpDialogOpen} onClose={onSignUpDialogClose} />
      <UserDialog isOpen={isUserDialogOpen} onClose={onUserDialogClose} />
    </>
  );
};

export default UserSettings;

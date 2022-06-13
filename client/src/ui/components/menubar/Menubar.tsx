import ToolType from '@/core/tool/ToolType';
import DataContext from '@/ui/DataContext';
import useObservable from '@/ui/hooks/useObservable';
import useStore from '@/ui/hooks/useStore';
import RectangleToolOptions from '@/ui/tools/rectangle/RectangleToolOptions';
import { Button, HStack, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import LoginDialog from '../login/LoginDialog';
import SignUpDialog from '../signup/SignUpDialog';

const Menubar = () => {
  const { userStore } = useContext(DataContext);
  const [connectUserStore, connectToolStore] = useStore(DataContext, 'userStore', 'toolStore');
  // const connectToolStore = useStore('toolStore');
  const email = useObservable(connectUserStore, (store) => store.email);
  const selectedTool = useObservable(connectToolStore, (store) => store.selectedTool);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [isSignUpDialogOpen, setSignUpDialogOpen] = useState(false);

  const renderToolOptions = () => {
    switch (selectedTool?.type) {
      case ToolType.Rectangle:
        return <RectangleToolOptions />;
    }
    return <></>;
  };

  const handleClick = () => {
    setLoginDialogOpen(true);
  };

  const handleClose = () => {
    setLoginDialogOpen(false);
  };

  const handleSignUpDialogClose = () => {
    setSignUpDialogOpen(false);
  }

  const handleSignUp = () => {
    setSignUpDialogOpen(false);
  }

  const handleLogin = (token: string, email: string) => {
    setLoginDialogOpen(false);
    if (userStore) {
      userStore.token = token;
      userStore.email = email;
    }
  }

  const renderLogin = () => (
    <Button colorScheme="blue" onClick={handleClick}>
      Log in
    </Button>
  );

  const renderSignUp = () => (
    <Button colorScheme="blue" onClick={() => setSignUpDialogOpen(true)}>
      Sign Up
    </Button>
  );

  return (
    <HStack className="menubar" justify="space-between">
      {renderToolOptions()}
      <HStack justify="end" w="full">
        {renderLogin()}
        {renderSignUp()}
        <Text>{email}</Text>
      </HStack>
      <LoginDialog isOpen={isLoginDialogOpen} onClose={handleClose} onLogin={handleLogin} />
      <SignUpDialog isOpen={isSignUpDialogOpen} onClose={handleSignUpDialogClose} onSignUp={handleSignUp} />
    </HStack>
  );
};

export default Menubar;

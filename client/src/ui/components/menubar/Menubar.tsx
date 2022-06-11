import ToolType from '@/core/tool/ToolType';
import DataContext from '@/ui/DataContext';
import useData from '@/ui/hooks/useData';
import RectangleToolOptions from '@/ui/tools/rectangle/RectangleToolOptions';
import { Button, HStack } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import LoginDialog from '../login/LoginDialog';
import SignUpDialog from '../signup/SignUpDialog';

const Menubar = () => {
  const { tools } = useContext(DataContext);
  const selectedTool = useData('selectedTool', tools);
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

  const handleLogin = (_token: string) => {
    setLoginDialogOpen(false);
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
      {renderLogin()}
      {renderSignUp()}
      <LoginDialog isOpen={isLoginDialogOpen} onClose={handleClose} onLogin={handleLogin} />
      <SignUpDialog isOpen={isSignUpDialogOpen} onClose={handleSignUpDialogClose} onSignUp={handleSignUp} />
    </HStack>
  );
};

export default Menubar;

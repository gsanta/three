import ToolType from '@/core/tool/ToolType';
import DataContext from '@/ui/DataContext';
import useData from '@/ui/hooks/useData';
import RectangleToolOptions from '@/ui/tools/rectangle/RectangleToolOptions';
import { Button, HStack } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import LoginDialog from '../login/LoginDialog';

const Menubar = () => {
  const { tools } = useContext(DataContext);
  const selectedTool = useData('selectedTool', tools);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);

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

  const handleLogin = (token: string) => {
    setLoginDialogOpen(false);
  }

  const renderLogin = () => (
    <Button colorScheme="blue" onClick={handleClick}>
      Log in
    </Button>
  );

  return (
    <HStack className="menubar" justify="space-between">
      {renderToolOptions()}
      {renderLogin()}
      <LoginDialog isOpen={isLoginDialogOpen} onClose={handleClose} onLogin={handleLogin} />
    </HStack>
  );
};

export default Menubar;

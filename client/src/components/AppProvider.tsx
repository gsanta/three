import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ProtectedPage from './layout/ProtectedPage';
import App from './App';
import theme from './theme';

const AppProvider = () => {
  return (
    <ProtectedPage>
      <ChakraProvider theme={theme} cssVarsRoot="body">
        <App />
      </ChakraProvider>
    </ProtectedPage>
  );
};

export default AppProvider;

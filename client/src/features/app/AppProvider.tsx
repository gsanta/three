import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import App from './App';
import theme from '@/components/theme';
import ProtectedPage from '@/components/ProtectedPage';

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

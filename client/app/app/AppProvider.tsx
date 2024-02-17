import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import App from './App';
import theme from '@/common/themes/theme';
import ProtectedPage from '../common/components/ProtectedPage';

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

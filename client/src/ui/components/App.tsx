import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '../customTheme';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/queryClient';
import '../../app.scss';
import Layout from './layout/Layout';
import Box from './box/Box';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
      <Layout
        header={
          <Box bgColor="orange.200" height="40px">
            Header
          </Box>
        }
        footer={
          <Box bgColor="orange.200" height="40px">
            Footer
          </Box>
        }
      >
        <Box width="40px" bgColor="green"></Box>
        <canvas id="canvas" style={{backgroundColor: 'red', width: 'calc(100% - 40px)'}}></canvas>
      </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;

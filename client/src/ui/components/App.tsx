import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '../customTheme';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/queryClient';
import '../../app.scss';
import '../../pages/editor/Canvas.scss';
import '../../ui/components/Palette.scss';
import '../../ui/components/Toolbar.scss';
import '../../ui/components/menubar/Menubar.scss';
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
        <canvas id="canvas" width="400" height="400" style={{backgroundColor: 'black'}}></canvas>
      </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;

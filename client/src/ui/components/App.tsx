import React, { useCallback, useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '../customTheme';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/queryClient';
import '../../app.scss';
import Layout from './layout/Layout';
import Box from './box/Box';

const App = () => {
  const [isModuleSet, setIsModuleSet] = useState(false);

  console.log('rendering app')

  useEffect(() => {
    if (window?.Module?.isRuntimeInitialize && !isModuleSet) {
      setIsModuleSet(true);
    }
  });

  const contentRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      const rect = node.getBoundingClientRect();
  
      if (isModuleSet) {
        window.Module.setWindowSize(rect.width, rect.height);
      }
    }
  }, [isModuleSet]);

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
        <Box ref={contentRef} sx={{width: 'calc(100% - 40px)'}}>
          <canvas id="canvas"></canvas>
        </Box>
      </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;

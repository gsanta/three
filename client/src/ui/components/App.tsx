import React, { useCallback, useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '../customTheme';
import '../../app.scss';
import Layout from './layout/Layout';
import Box from './box/Box';
import ExternalTool from '@/services/tool/ExternalTool';
import ToolStore from '@/services/tool/ToolStore';
import Toolbar from '../toolbar/Toolbar';

const App = () => {
  const [isModuleSet, setIsModuleSet] = useState(false);
  const [toolStore, setToolStore] = useState<ToolStore | undefined>();

  console.log('rendering app');

  useEffect(() => {
    if (window?.Module?.isRuntimeInitialize && !isModuleSet) {
      setIsModuleSet(true);

      const tools = [new ExternalTool('pencil', 'BiPencil', Module), new ExternalTool('rectangle', 'BiPencil', Module)];
      setToolStore(new ToolStore(tools));
    }
  }, [isModuleSet]);

  const contentRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        const rect = node.getBoundingClientRect();

        if (isModuleSet) {
          window.Module.setWindowSize(rect.width, rect.height);
        }
      }
    },
    [isModuleSet],
  );

  return (
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
        <Box width="40px" bgColor="green">
          <Toolbar toolStore={toolStore} />
        </Box>
        <Box ref={contentRef} sx={{ width: 'calc(100% - 40px)' }}>
          <canvas id="canvas"></canvas>
        </Box>
      </Layout>
    </ChakraProvider>
  );
};

export default App;

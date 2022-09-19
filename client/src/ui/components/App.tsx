import React, { useCallback, useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import '../../app.scss';
import Layout from './layout/Layout';
import Box from './box/Box';
import ExternalTool from '@/services/tool/ExternalTool';
import ToolStore from '@/services/tool/ToolStore';
import Toolbar from '../toolbar/Toolbar';
import theme from './theme';
import ToolName from '@/services/tool/ToolName';

const App = () => {
  const [isModuleSet, setIsModuleSet] = useState(false);
  const [toolStore, setToolStore] = useState<ToolStore | undefined>();

  console.log('rendering app');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (window?.Module?.isRuntimeInitialize && !isModuleSet) {
      setIsModuleSet(true);

      const tools = [
        new ExternalTool(ToolName.Brush, 'BiPencil', Module),
        new ExternalTool(ToolName.Rectangle, 'BiRectangle', Module),
        new ExternalTool(ToolName.SelectionRectangle, 'BiBorderRadius', Module),
        new ExternalTool(ToolName.Erase, 'BiEraser', Module),
      ];
      setToolStore(new ToolStore(tools));
    }
  });

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
    <ChakraProvider theme={theme} cssVarsRoot="body">
      <Layout
        header={
          <Box bgColor="blackAlpha.800" height="40px">
            Header
          </Box>
        }
        footer={
          <Box bgColor="blackAlpha.800" height="40px">
            Footer
          </Box>
        }
      >
        <Box width="50px">
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

import React from 'react';
import Editor from '@/Editor';
import Canvas from '@/pages/editor/Canvas';
import Split from 'react-split';
import { useState, useCallback } from 'react';
import DataContext from '../DataContext';
import Toolbar from './Toolbar';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import Palette from './Palette';
import Menubar from './menubar/Menubar';
import customTheme from '../customTheme';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/queryClient';
import 'react-reflex/styles.css';
import 'antd/dist/antd.css';
import '../../app.scss';
import '../../pages/editor/Canvas.scss';
import '../../ui/components/Palette.scss';
import '../../ui/components/Toolbar.scss';
import '../../ui/components/menubar/Menubar.scss';

const App = () => {
  const [editor, setEditor] = useState<Editor | undefined>(undefined);

  const ref = useCallback((node: HTMLCanvasElement) => {
    if (node) {
      node.width = 400;
      node.height = 400;
      const context = node.getContext('2d');
      if (context) {
        const newEditor = new Editor(node, context);
        setEditor(newEditor);
        (window as any).editor = newEditor;
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <DataContext.Provider
          value={{
            canvas: editor?.canvasStore,
            mouseInput: editor?.mouseInput,
            palette: editor?.paletteStore,
            tools: editor?.toolStore,
          }}
        >
          <Menubar />
          <Split className="split" sizes={[75, 25]}>
            <Flex height="100%">
              <Toolbar />
              <Flex grow={1} direction="column" height="100%">
                <Flex grow={1} alignItems="center" justifyContent="space-around">
                  <Canvas canvasRef={ref} />
                </Flex>
              </Flex>
            </Flex>
            <div>
              <Palette />
            </div>
          </Split>
        </DataContext.Provider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;

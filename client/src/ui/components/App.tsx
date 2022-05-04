import Editor from '@/Editor';
import Canvas from '@/pages/editor/Canvas';
import Split from 'react-split';
import { useState, useCallback } from 'react';
import DataContext from '../DataContext';
import Toolbar from './Toolbar';
import { ChakraProvider, Container, Flex, HStack } from '@chakra-ui/react';
import Palette from './Palette';
import Menubar from './menubar/Menubar';

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
    <ChakraProvider>
      <DataContext.Provider
        value={{
          canvas: editor?.canvasStore,
          mouseInput: editor?.mouseInput,
          palette: editor?.paletteStore,
          tool: editor?.toolStore,
        }}
      >
        <Split className="split" sizes={[75, 25]}>
          <Flex height="100%">
            <Toolbar />
            <Flex grow={1} direction="column" height="100%">
              <Menubar />
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
  );
};

export default App;

import Editor from '@/Editor';
import Canvas from '@/pages/editor/Canvas';
import { useState, useCallback } from 'react';
import DataContext from '../DataContext';
import Toolbar from './Toolbar';

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
    <DataContext.Provider
      value={{
        canvas: editor?.canvasStore,
        mouseInput: editor?.mouseInput,
        palette: editor?.paletteStore,
        tool: editor?.toolStore,
      }}
    >
      <Toolbar />
      <Canvas canvasRef={ref} />
    </DataContext.Provider>
  );
};

export default App;

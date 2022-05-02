import ToolStore from '@/core/tool/ToolStore';
import PaletteStore from '@/features/palette/PaletteStore';
import React from 'react';
import MouseInput from '../core/input/MouseInput';
import CanvasStore from '../features/canvas/CanvasStore';

export interface DataContextType {
  canvas: CanvasStore;
  mouseInput: MouseInput;
  palette: PaletteStore;
  tool: ToolStore;
}

const DataContext = React.createContext<Partial<DataContextType>>({});

export default DataContext;

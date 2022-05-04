import ToolStore from '@/core/tool/ToolStore';
import PaletteStore from '@/features/palette/PaletteStore';
import RectangleToolStore from '@/features/tools/rectangle/RectangleToolStore';
import React from 'react';
import MouseInput from '../core/input/MouseInput';
import CanvasStore from '../features/canvas/CanvasStore';

export interface DataContextType {
  canvas: CanvasStore;
  mouseInput: MouseInput;
  palette: PaletteStore;
  tool: ToolStore;
  rectangleTool: RectangleToolStore;
}

const DataContext = React.createContext<Partial<DataContextType>>({});

export default DataContext;

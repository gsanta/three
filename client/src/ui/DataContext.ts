import ToolStore from '@/core/tool/ToolStore';
import PaletteStore from '@/features/palette/PaletteStore';
import RectangleToolStore from '@/features/tools/rectangle/RectangleToolStore';
import UserStore from '@/global/user/UserStore';
import React from 'react';
import MouseInput from '../core/input/MouseInput';
import CanvasStore from '../features/canvas/CanvasStore';

export interface DataContextType {
  canvas: CanvasStore;
  mouseInput: MouseInput;
  palette: PaletteStore;
  tools: ToolStore;
  rectangleTool: RectangleToolStore;
  userStore: UserStore;
}

const DataContext = React.createContext<Partial<DataContextType>>({});

export default DataContext;

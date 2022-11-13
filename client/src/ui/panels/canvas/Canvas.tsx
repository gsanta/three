import Box from '@/ui/components/box/Box';
import useAppContext from '@/ui/hooks/useAppContext';
import { useResizeObserver } from '@/ui/hooks/useResizeObserver';
import React from 'react';

type CanvasProps = {
  container?: HTMLDivElement;
};

const Canvas = ({ container }: CanvasProps) => {
  const { windowHandler } = useAppContext();

  useResizeObserver(container, () => windowHandler.updateWindowSize());

  return <Box as="canvas" id="canvas"></Box>;
};

export default Canvas;

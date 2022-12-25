import Box from '@/ui/components/box/Box';
import useAppContext from '@/ui/hooks/useAppContext';
import { useResizeObserver } from '@/ui/hooks/useResizeObserver';
import { forwardRef } from '@chakra-ui/react';
import React from 'react';

type CanvasProps = {
  container?: HTMLCanvasElement;
};

const Canvas = forwardRef(({ container }: CanvasProps, ref) => {
  const { windowHandler } = useAppContext();

  useResizeObserver(container?.parentElement as HTMLDivElement, () => windowHandler.updateWindowSize());

  return <Box as="canvas" id="canvas" ref={ref}></Box>;
});

export default Canvas;

import { Box as _Box, BoxProps, forwardRef } from '@chakra-ui/react';
import React from 'react';

const Box = forwardRef<BoxProps, 'div'>((props, ref) => {
  return <_Box {...props} ref={ref} />;
});

export type { BoxProps };

export default Box;

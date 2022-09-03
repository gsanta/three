import { Box as _Box, BoxProps, forwardRef } from '@chakra-ui/react';
import React from 'react';

/**
 * Box is the most abstract component on top of which all other components are built. By default, it renders a div element.
 *
 * And this is our CSS-in-JS component, you can use this with style props.
 */
const Box = forwardRef<BoxProps, 'div'>((props, ref) => {
  return <_Box {...props} ref={ref} />;
});

export type { BoxProps };

export default Box;

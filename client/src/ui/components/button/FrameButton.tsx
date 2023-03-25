import * as React from 'react';
import { Box, BoxProps, forwardRef, useStyleConfig } from '@chakra-ui/react';

type FrameButtonProps = BoxProps & {
  index: number;
  isActive: boolean;
  onFrameSelect(index: number): void;
};

const FrameButton = forwardRef<FrameButtonProps, 'input'>((props, ref) => {
  const { index, isActive, onFrameSelect, ...rest } = props;

  const styles = useStyleConfig('FrameButton', { colorScheme: isActive ? 'orange' : 'gray', size: 'md' });

  return <Box as="button" onClick={() => onFrameSelect(index)} sx={styles} {...rest} ref={ref} />;
});

export default FrameButton;

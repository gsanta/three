import { Tooltip as _Tooltip, TooltipProps, forwardRef } from '@chakra-ui/react';
import React from 'react';

const Tooltip = forwardRef<TooltipProps, 'div'>((props, ref) => {
  const { children, shouldWrapChildren, ...rest } = props;
  const properties: TooltipProps = {
    bg: 'neutral.10',
    children,
    hasArrow: true,
    placement: 'top',
    ...rest,
  };

  return <_Tooltip {...properties} ref={ref} />;
});

export default Tooltip;

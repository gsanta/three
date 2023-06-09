import useDropLayer from '@/features/layer/ui/hooks/useDropLayer';
import { Box, Divider } from '@chakra-ui/react';
import React from 'react';

type LayerDropTargetProps = {
  layerIndex: number;
};

const LayerDropTarget = ({ layerIndex }: LayerDropTargetProps) => {
  const { isOver, ref } = useDropLayer(layerIndex);

  return (
    <Box as="li" ref={ref}>
      <Divider borderBottomWidth="5" borderColor={isOver ? 'orange.500' : 'transparent'} marginBlock="1" />
    </Box>
  );
};

export default LayerDropTarget;

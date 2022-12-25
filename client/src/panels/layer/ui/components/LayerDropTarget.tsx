import useDropLayer from '@/panels/layer/ui/hooks/useDropLayer';
import useAppContext from '@/ui/hooks/useAppContext';
import { Box, Divider } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';

type LayerDropTargetProps = {
  layerIndex: number;
};

const LayerDropTarget = observer(({ layerIndex }: LayerDropTargetProps) => {
  const { layerHandler } = useAppContext();

  const { isOver, ref } = useDropLayer(layerIndex, layerHandler);

  return (
    <Box as="li" ref={ref}>
      <Divider borderBottomWidth="2" borderColor={isOver ? 'orange.500' : 'transparent'} marginBlock="1" />
    </Box>
  );
});

export default LayerDropTarget;

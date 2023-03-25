import FrameButton from '@/ui/components/button/FrameButton';
import { Box, Divider } from '@chakra-ui/react';
import Icon from '@/ui/components/icon/Icon';
import React from 'react';
import { Tooltip, Button } from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { addFrame, removeFrame, setActiveFrame } from '../state/frameSlice';

const Frames = () => {
  const frames = useAppSelector((state) => state.frame.frames);
  const activeIndex = useAppSelector((state) => state.frame.activeIndex);
  const dispatch = useAppDispatch();

  const handleFrameSelect = (index: number) => {
    dispatch(setActiveFrame(index));
  };

  return (
    <Box>
      <Box display="flex" gap="2" justifyContent="end">
        <Tooltip label="delete frame">
          <Button
            className="iconOnly"
            disabled={frames.length <= 1}
            onClick={() => dispatch(removeFrame(activeIndex))}
            size="sm"
          >
            <Icon name="BiTrashAlt" />
          </Button>
        </Tooltip>
        <Tooltip label="new frame">
          <Button className="iconOnly" onClick={() => dispatch(addFrame())} size="sm">
            <Icon name="BiPlus" />
          </Button>
        </Tooltip>
      </Box>
      <Divider marginBlock="2" />
      {frames.map((frame, index) => (
        <FrameButton
          index={index}
          isActive={index === activeIndex}
          key={frame.index}
          onFrameSelect={handleFrameSelect}
          marginBlockEnd="0.5"
          marginInlineEnd="0.5"
        />
      ))}
    </Box>
  );
};

export default Frames;

import FrameButton from '@/common/components/FrameButton';
import { Box, Divider } from '@chakra-ui/react';
import Icon from '@/common/components/icon/Icon';
import React from 'react';
import { Tooltip, Button } from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '@/common/hooks/hooks';
import { activateFramePlayer, addFrame, deActivateFramePlayer, removeFrame, setActiveFrame } from '../state/frameSlice';

const Frames = () => {
  const frames = useAppSelector((state) => state.frame.frames);
  const activeIndex = useAppSelector((state) => state.frame.activeIndex);
  const isPlaying = useAppSelector((state) => state.frame.isPlaying);
  const dispatch = useAppDispatch();

  const handleFrameSelect = (index: number) => {
    dispatch(setActiveFrame(index));
  };

  const isSingleFrame = frames.length <= 1;

  return (
    <Box>
      <Box display="flex" gap="2" justifyContent="end">
        {isPlaying ? (
          <Tooltip label="stop frame player">
            <Button className="iconOnly" onClick={() => dispatch(deActivateFramePlayer())} size="sm">
              <Icon name="BiStop" />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip label={isSingleFrame ? "can't play a single frame" : 'start frame player'}>
            <Button
              className="iconOnly"
              onClick={() => dispatch(activateFramePlayer())}
              size="sm"
              isDisabled={isSingleFrame}
            >
              <Icon name="BiPlay" />
            </Button>
          </Tooltip>
        )}

        <Tooltip label={isSingleFrame ? "can't remove last frame" : 'remove frame'}>
          <Button
            className="iconOnly"
            isDisabled={isSingleFrame}
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

import { useAppDispatch, useAppSelector } from '@/hooks';
import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import React from 'react';
import { setCircleFilled } from '../state/toolSlice';

const CircleToolOptions = () => {
  const isFilled = useAppSelector((state) => state.tool.isCircleFilled);

  const dispatch = useAppDispatch();

  const handleFilledChange = () => {
    dispatch(setCircleFilled(!isFilled));
  };

  return (
    <FormControl display="flex" flexDirection="row" alignItems="center" marginTop="4">
      <FormLabel size="xs">Filled:</FormLabel>
      <Switch onChange={handleFilledChange} isChecked={isFilled} />
    </FormControl>
  );
};

export default CircleToolOptions;

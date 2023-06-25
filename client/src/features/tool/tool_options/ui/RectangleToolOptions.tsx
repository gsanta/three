import { useAppDispatch, useAppSelector } from '@/hooks';
import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import React from 'react';
import { setRectangleFilled } from '../../state/toolSlice';

const RectangleToolOptions = () => {
  const isFilled = useAppSelector((state) => state.tool.isRectangleFilled);

  const dispatch = useAppDispatch();

  const handleFilledChange = () => {
    dispatch(setRectangleFilled(!isFilled));
  };

  return (
    <FormControl display="flex" flexDirection="row" alignItems="center" marginTop="4">
      <FormLabel size="xs">Filled:</FormLabel>
      <Switch onChange={handleFilledChange} isChecked={isFilled} />
    </FormControl>
  );
};

export default RectangleToolOptions;

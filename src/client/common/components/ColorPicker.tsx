import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import React, { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { setColor } from '@/client/editor/stores/template/templateSlice';

const ColorPicker = () => {
  const color = useAppSelector((state) => state.template.present.color);

  const [tempColor, setTempColor] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const handleChangeComplete = (newColor: ColorResult) => {
    dispatch(setColor(newColor.rgb));
    setTempColor(null);
  };

  const handleChange = (newColor: ColorResult) => {
    setTempColor(newColor.hex);
  };

  return <ChromePicker color={tempColor || color} onChange={handleChange} onChangeComplete={handleChangeComplete} />;
};

export default ColorPicker;

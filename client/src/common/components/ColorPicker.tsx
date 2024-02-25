import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { colorToHexString } from '../../editor/features/tool/utils/colorUtils';
import React, { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

const ColorPicker = () => {
  const color = useAppSelector((state) => state.settings.color);

  const [tempColor, setTempColor] = useState<string | null>(color);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChangeComplete = (_newColor: ColorResult) => {
    // dispatch(setColor(colorToHexString(newColor.rgb)));
    setTempColor(null);
  };

  const handleChange = (newColor: ColorResult) => {
    setTempColor(newColor.hex);
  };

  return <ChromePicker color={tempColor || color} onChange={handleChange} onChangeComplete={handleChangeComplete} />;
};

export default ColorPicker;

import { setColor } from '../../features/settings/state/settingsSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { colorToHexString } from '../../features/tool/utils/colorUtils';
import React, { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

const ColorPicker = () => {
  const color = useAppSelector((state) => state.settings.color);
  const dispatch = useAppDispatch();

  const [tempColor, setTempColor] = useState<string | null>(color);

  const handleChangeComplete = (newColor: ColorResult) => {
    dispatch(setColor(colorToHexString(newColor.rgb)));
    setTempColor(null);
  };

  const handleChange = (newColor: ColorResult) => {
    setTempColor(newColor.hex);
  };

  return <ChromePicker color={tempColor || color} onChange={handleChange} onChangeComplete={handleChangeComplete} />;
};

export default ColorPicker;

import { colorToHexString } from '@/panels/tool_options/colorUtils';
import useAppContext from '@/ui/hooks/useAppContext';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

const ColorPicker = observer(() => {
  const { editorStore } = useAppContext();

  const [tempColor, setTempColor] = useState<string | null>(editorStore.color);

  const handleChangeComplete = (newColor: ColorResult) => {
    editorStore.setColor(colorToHexString(newColor.rgb));
    setTempColor(null);
  };

  const handleChange = (newColor: ColorResult) => {
    setTempColor(newColor.hex);
  };

  return (
    <ChromePicker
      color={tempColor || editorStore.color}
      onChange={handleChange}
      onChangeComplete={handleChangeComplete}
    />
  );
});

export default ColorPicker;

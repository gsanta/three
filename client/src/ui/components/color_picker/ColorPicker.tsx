import { colorToHexString } from '@/panels/tool_options/colorUtils';
import useAppContext from '@/ui/hooks/useAppContext';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ChromePicker, RGBColor } from 'react-color';

const ColorPicker = observer(() => {
  const { editorStore } = useAppContext();

  const [color, setColor] = useState<RGBColor>({ r: 255, g: 255, b: 255, a: 1 });

  const handleChangeComplete = () => {
    editorStore.setColor(colorToHexString(color));
  };

  return (
    <ChromePicker
      color={color}
      onChange={(newColor) => setColor(newColor.rgb)}
      onChangeComplete={handleChangeComplete}
    />
  );
});

export default ColorPicker;

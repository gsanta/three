import ToolName from '@/panels/toolbar/model/ToolName';
import { observer } from 'mobx-react-lite';
import React from 'react';
import ColorPicker from '@/ui/components/color_picker/ColorPicker';
import useAppContext from '@/ui/hooks/useAppContext';
import { Button, Tooltip } from '@chakra-ui/react';
import Box from '@/ui/components/box/Box';
import ToggleButton from '@/ui/components/button/ToggleButton';
import Icon from '@/ui/components/icon/Icon';

const downloadURL = function (data: string, fileName: string) {
  const a: HTMLAnchorElement = document.createElement('a');
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.setAttribute('style', 'display: none');
  a.click();
  a.remove();
};

const downloadBlob = (data: ArrayBufferLike, fileName = 'spright.png', mimeType = 'application/octet-stream') => {
  const blob = new Blob([data], {
    type: mimeType,
  });
  const url = window.URL.createObjectURL(blob);
  downloadURL(url, fileName);
  setTimeout(function () {
    return window.URL.revokeObjectURL(url);
  }, 1000);
};

const Toolbar = observer(() => {
  const { toolStore, editorStore, editorApi } = useAppContext();

  const handleSelectTool = (name: string) => {
    toolStore.setSelectedTool(name as ToolName);
  };

  const handleClick = () => {
    editorApi.exportImage();
    const data = editorApi.getImageData();
    const size = editorApi.getImageSize();
    const buffer = new Uint8Array(Module.HEAPU8.buffer, data, size);
    downloadBlob(buffer);
    // const data = editorApi.getImageData();
  };

  return (
    <Box
      height="100%"
      paddingBlockStart="1"
      paddingBlockEnd="1"
      display="flex"
      flexDirection="column"
      gap="1"
      alignItems="center"
    >
      {toolStore?.tools.map(({ iconName, name }) => {
        const toggle = name === toolStore.getSelectedTool()?.name;
        return (
          <Tooltip key={name} label={name} placement="right">
            <ToggleButton
              className="iconOnly"
              toggle={toggle}
              onToggle={() => handleSelectTool(name)}
              variant="outline"
            >
              <Icon name={iconName} />
            </ToggleButton>
          </Tooltip>
        );
      })}

      <ColorPicker editorStore={editorStore} />
      <Button onClick={handleClick}>E</Button>
    </Box>
  );
});

export default Toolbar;

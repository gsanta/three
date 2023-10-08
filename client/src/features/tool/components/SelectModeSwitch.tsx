import React, { ReactNode } from 'react';
import { Box, useRadio, useRadioGroup, HStack, UseRadioProps } from '@chakra-ui/react';
import Editor from '@/features/editor/Editor';

const SelectModeSwitchButton = (props: { children: ReactNode } & UseRadioProps) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="sm"
        boxShadow="md"
        _checked={{
          bg: 'orange.500',
          color: 'white',
          borderColor: 'orange.500',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={3}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
};

const SelectModeSwitch = ({ onChange }: { onChange: (name: string) => void }) => {
  const options: Parameters<Editor['setSelectionMode']>[0][] = ['move', 'rotate', 'shear'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'selection-manipulation-mode',
    defaultValue: 'move',
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <SelectModeSwitchButton key={value} {...radio}>
            {value}
          </SelectModeSwitchButton>
        );
      })}
    </HStack>
  );
};

export default SelectModeSwitch;

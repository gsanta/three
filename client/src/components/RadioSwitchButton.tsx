import React from 'react';
import { Box, useRadio, UseRadioProps } from '@chakra-ui/react';

type RadioSwitchButtonProps = {
  children: string;
  value: string;
} & UseRadioProps;

const RadioSwitchButton = ({ children, ...rest }: RadioSwitchButtonProps) => {
  const { getInputProps, getRadioProps } = useRadio(rest);

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
        {children}
      </Box>
    </Box>
  );
};

export default RadioSwitchButton;

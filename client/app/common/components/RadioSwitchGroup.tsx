import { useRadioGroup, HStack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type RadiowSwitchGroupProps = {
  onChange(name: string): void;
  name: string;
  defaultValue: string;
  children: ReactNode[];
};

const RadioSwitchGroup = ({ children, defaultValue, onChange, name }: RadiowSwitchGroupProps) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange,
  });

  const group = getRootProps();

  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const radio = getRadioProps({ value: child.props.value });
      return React.cloneElement(child, { ...radio, key: child.props.value });
    }
    return child;
  });

  return (
    <HStack display="flex" flexWrap="wrap" {...group}>
      {clonedChildren}
    </HStack>
  );
};

export default RadioSwitchGroup;

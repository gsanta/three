import { HStack, ModalFooter, ModalFooterProps } from '@chakra-ui/react';
import React from 'react';

export type DialogFooterProps = ModalFooterProps;

const DialogFooter = ({ children, ...rest }: DialogFooterProps) => {
  return (
    <ModalFooter {...rest}>
      <HStack spacing="2" justifyContent="end">
        {children}
      </HStack>
    </ModalFooter>
  );
};

export default DialogFooter;

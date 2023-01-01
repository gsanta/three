import { HStack, ModalFooter, ModalFooterProps } from '@chakra-ui/react';
import React from 'react';

export type DialogFooterProps = ModalFooterProps;

const DialogFooter = ({ children, ...rest }: DialogFooterProps) => {
  return (
    <ModalFooter paddingInline="2" {...rest}>
      <HStack justifyContent="end">{children}</HStack>
    </ModalFooter>
  );
};

export default DialogFooter;

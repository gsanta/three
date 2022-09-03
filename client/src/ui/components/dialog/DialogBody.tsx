import { ModalBody, ModalBodyProps } from '@chakra-ui/react';
import React from 'react';

export type DialogBodyProps = ModalBodyProps;

const DialogBody = (props: DialogBodyProps) => {
  return <ModalBody {...props} />;
};

export default DialogBody;
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  usePrefersReducedMotion,
  Text,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { BiX } from 'react-icons/bi';

export type DialogProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose(): void;
  title: string;
};

const Dialog = ({ children, isOpen, onClose, title }: DialogProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Modal
      closeOnEsc={true}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      motionPreset={prefersReducedMotion ? 'none' : 'scale'}
      onClose={onClose}
      trapFocus={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text as="h1" color="gray.300" size="3" textTransform="uppercase">
            {title}
          </Text>
        </ModalHeader>
        <ModalCloseButton>
          <BiX size={30} />
        </ModalCloseButton>
        {children}
      </ModalContent>
    </Modal>
  );
};

export default Dialog;

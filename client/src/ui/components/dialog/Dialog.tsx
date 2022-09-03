import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  usePrefersReducedMotion,
  HTMLChakraProps,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { BiX } from 'react-icons/bi';

export interface DialogProps extends Omit<HTMLChakraProps<'section'>, 'scrollBehavior'> {
  dataTestid?: string;
  isClosable?: boolean;
  isOpen: boolean;
  onClose(): void;
  size?: 'small' | 'medium' | 'large' | 'full';
  scrollBehavior?: 'inside' | 'outside';
  title: string;
  trapFocus?: boolean;
  variant?: 'default' | 'empty';
}

const Dialog = ({
  children,
  dataTestid,
  isClosable,
  isOpen,
  onClose,
  scrollBehavior,
  size,
  title,
  trapFocus,
  variant,
  ...rest
}: DialogProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Modal
      closeOnEsc={isClosable}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      motionPreset={prefersReducedMotion ? 'none' : 'scale'}
      onClose={isClosable ? onClose : () => {}}
      scrollBehavior={scrollBehavior}
      trapFocus={trapFocus}
    >
      <ModalOverlay />
      <ModalContent data-testid={dataTestid} {...rest}>
        {variant !== 'empty' && (
          <>
            <ModalHeader>
              <Text as="h1" size="5">
                {title}
              </Text>
            </ModalHeader>
            <ModalCloseButton isDisabled={!isClosable}>
              <BiX size={30} />
            </ModalCloseButton>
          </>
        )}
        {children}
      </ModalContent>
    </Modal>
  );
};

Dialog.defaultProps = {
  isClosable: true,
  scrollBehavior: 'outside',
  size: 'medium',
  trapFocus: true,
  variant: 'default',
} as DialogProps;

export default Dialog;

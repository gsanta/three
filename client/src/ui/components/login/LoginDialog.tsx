import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import useLogin from './useLogin';

type Props = {
  isOpen: boolean;
  onClose(): void;
  onLogin(token: string, email: string): void;
};

const LoginDialog = ({ isOpen, onClose, onLogin }: Props) => {
  const { isError, isLoading, login, emailProps, passwordProps, reset } = useLogin(onLogin);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={login}>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap="1rem">
            <FormControl>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input id="email" type="email" {...emailProps} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" type="password" {...passwordProps} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <VStack gap="1rem" align="end" width="full">
            <Button isLoading={isLoading} variant="ghost" type="submit">
              Log in
            </Button>
            {isError && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>Could not log in.</AlertDescription>
              </Alert>
            )}
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginDialog;

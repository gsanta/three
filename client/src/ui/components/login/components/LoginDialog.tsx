import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  HStack,
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
import { useQuery } from 'react-query';
import apiInstance from '@/api/apiInstance';
import getCsrfTokenCookie from '@/api/getCsrfTokenCookie';
import useLogin from '../useLogin';

type Props = {
  isOpen: boolean;
  onClose(): void;
  onLogin(email: string): void;
};

const LoginDialog = ({ isOpen, onClose, onLogin }: Props) => {
  const { isError, isLoading, login, emailProps, passwordProps, reset } = useLogin(onLogin);

  const { data } = useQuery('token', () => apiInstance.get('/editor/show'));

  // const { data: currentUserData } = useQuery('current_user', () => apiInstance.get(currentUserPath()));

  const handleClose = () => {
    reset();
    onClose();
  };

  const cookie = getCsrfTokenCookie();
  console.log(cookie);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
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
            <HStack alignItems="center" justifyContent="space-between" width="full">
              <form method="post" action="/users/auth/github">
                <Button type="submit">GitHub</Button>
                <input type="hidden" id="payload" name="authenticity_token" value={data?.data?.token} />
              </form>
              <Button isLoading={isLoading} variant="ghost" type="submit" onClick={login}>
                Log in
              </Button>
            </HStack>
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

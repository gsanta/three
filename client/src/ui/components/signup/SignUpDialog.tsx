import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, FormControl, FormLabel, Input, ModalFooter, Button, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import React from "react";
import useSignUp from "./useSignUp";

type Props = {
  isOpen: boolean;
  onClose(): void;
  onSignUp(token: string): void;
};

const SignUpDialog = ({ isOpen, onClose, onSignUp }: Props) => {
  const { isError, isLoading, emailProps, passwordProps, passwordConfirmationProps, reset, signUp } = useSignUp(onSignUp);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={signUp} data-testid="sign-up-dialog">
        <ModalHeader>Sign Up</ModalHeader>
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
            <FormControl>
              <FormLabel htmlFor="password-confirmation">Password Confirmation</FormLabel>
              <Input id="password-confirmation" type="password" {...passwordConfirmationProps} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <VStack gap="1rem" align="end" width="full">
            <Button isLoading={isLoading} variant="ghost" type="submit">
              Sign Up
            </Button>
            {isError && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>Could not sign up.</AlertDescription>
              </Alert>
            )}
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SignUpDialog;

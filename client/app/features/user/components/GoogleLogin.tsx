import { Box } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useEffect } from 'react';

type GoogleLoginProps = {
  onLogin(credential: string): void;
};

const GoogleLogin = ({ onLogin }: GoogleLoginProps) => {
  const handleLogin = useCallback(
    async (response: { credential?: string }) => {
      if (response.credential) {
        onLogin(response.credential);
      }
    },
    [onLogin],
  );

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
      callback: handleLogin,
      cancel_on_tap_outside: false,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'medium',
    });
  }, [handleLogin]);

  return <Box id="signInDiv" marginBottom="20px" />;
};

export default GoogleLogin;

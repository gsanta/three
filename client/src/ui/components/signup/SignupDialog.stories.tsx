import { VStack, Text } from '@chakra-ui/react';
import { ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import React, { useState } from 'react';
import authTokenMock from '../login/mocks/authToken.mock';
import SignUpDialog from './SignUpDialog';

const Template: ComponentStory<typeof SignUpDialog> = (props) => {
  const [token, setToken] = useState<string | null>(null);

  const handleSignUp = (newToken: string) => {
    setToken(newToken);
    props.onSignUp(newToken);
  };

  return (
    <div>
      <VStack align="start">
        {token && (
          <Text>
            Auth token: <Text>{token}</Text>
          </Text>
        )}
      </VStack>
      <SignUpDialog {...props} onSignUp={handleSignUp} />
    </div>
  );
};

export default {
  title: 'SignupDialog',
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onClose: () => {},
  onSignUp: (_token: string) => {},
};
Default.parameters = {
  msw: {
    handlers: [
      rest.post('/users', (_req, res, ctx) => {
        return res(
          ctx.set('Authorization', `Bearer ${authTokenMock}`),
          ctx.json({
            message: 'Signed up successfully.',
            user: {
              id: 3,
              email: 'new_user2@test.com',
              created_at: '2022-06-10T22:43:34.313Z',
              updated_at: '2022-06-10T22:43:34.313Z',
              slug: 'bc435ca7-66cd-4476-898a-78b5f18db3a2',
            },
          }),
        );
      }),
    ],
  },
};

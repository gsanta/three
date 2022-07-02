import * as React from 'react';
import { Text, VStack } from '@chakra-ui/react';
import { ComponentStory } from '@storybook/react';
import { rest } from 'msw';
import LoginDialog from './LoginDialog';
import loginRequestMock from '../mocks/loginRequest.mock';
import authTokenMock from '../mocks/authToken.mock';

export default {
  title: 'LoginDialog',
};

const Template: ComponentStory<typeof LoginDialog> = (props) => {
  return (
    <div>
      <VStack align="start">
        <Text>User: {loginRequestMock.user.email}</Text>
        <Text>Password: {loginRequestMock.user.password}</Text>
      </VStack>
      <LoginDialog {...props} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onClose: () => {},
};
Default.parameters = {
  msw: [
    rest.post('/users/sign_in', (_req, res, ctx) => {
      return res(
        ctx.set('Authorization', `Bearer ${authTokenMock}`),
        ctx.json({
          email: 'user1@test.com',
        }),
      );
    }),
  ],
};

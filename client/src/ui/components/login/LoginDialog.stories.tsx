import * as React from 'react';
import { Text, VStack } from "@chakra-ui/react";
import { ComponentStory } from "@storybook/react";
import { rest } from "msw";
import { useState } from "react";
import LoginDialog from "./LoginDialog";
import authToken from "./mocks/authToken.mock";
import loginRequestData from "./mocks/loginRequestData.mock";

export default {
  title: 'LoginDialog',
};

const Template: ComponentStory<typeof LoginDialog> = (props) => {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
  }

  return (
    <div>
      <VStack align="start">
        <Text>
          User: {loginRequestData.email}
        </Text>
        <Text>
          Password: {loginRequestData.password}
        </Text>
        {token && (
          <Text>
            Auth token: <Text>{token}</Text>
          </Text>
        )}
      </VStack>
      <LoginDialog {...props} onLogin={handleLogin} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  onClose: () => {},
  onLogin: () => {},
}
Default.parameters = {
  msw: [
    rest.post('http://localhost:3000/users/sign_in', (_req, res, ctx) => {
      return res(
        ctx.set('Authorization', `Bearer ${authToken}`),
        ctx.json({
            "message": "You are logged in.",
            "user": {
                "id": 1,
                "email": "user1@test.com",
                "created_at": "2022-06-08T15:08:21.435Z",
                "updated_at": "2022-06-08T15:08:21.435Z",
                "slug": "bad0f25a-6e22-4e7f-86d6-736d7adb0571"
            }
        })
      )
    }),
  ],
}

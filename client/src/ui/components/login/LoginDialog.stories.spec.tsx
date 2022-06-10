
import * as React from 'react';
import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import * as stories from './LoginDialog.stories';
import { userEvent } from '@storybook/testing-library';
import loginRequestData from './mocks/loginRequestData.mock';
import authToken from './mocks/authToken.mock';

const { Default } = composeStories(stories);

describe('LoginDialog', () => {
  it ('can login', async () => {
    render(<Default />);

    const emailInput = await screen.findByLabelText('Email address');
    await userEvent.type(emailInput, loginRequestData.email);

    const passwordInput = screen.getByLabelText('Password');
    await userEvent.type(passwordInput, loginRequestData.password);

    const loginButton = screen.getByRole('button', {
      name: /log in/i
    });
    await userEvent.click(loginButton);
    
    expect(await screen.findByText(authToken)).toBeInTheDocument();
  });
});

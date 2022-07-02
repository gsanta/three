import * as React from 'react';
import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import * as stories from './LoginDialog.stories';
import loginRequestMock from '../mocks/loginRequest.mock';

const { Default } = composeStories(stories);

describe('LoginDialog', () => {
  it('can login', async () => {
    const onClose = jest.fn();
    render(<Default onClose={onClose} />);

    const emailInput = await screen.findByLabelText('Email address');
    await userEvent.type(emailInput, loginRequestMock.user.email);

    const passwordInput = screen.getByLabelText('Password');
    await userEvent.type(passwordInput, loginRequestMock.user.password);

    const loginButton = screen.getByRole('button', {
      name: /log in/i,
    });
    await userEvent.click(loginButton);

    expect(onClose).toHaveBeenCalled();
  });
});


import { userEvent } from '@storybook/testing-library';
import { composeStories } from '@storybook/testing-react';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import authTokenMock from '../login/mocks/authToken.mock';
import signUpRequest from './mocks/signUpRequest.mock';
import * as stories from './SignupDialog.stories';

const { Default } = composeStories(stories);

describe('SignUpDialog', () => {
  it('can sign up a user', async () => {
    const handleSignUp = jest.fn();
    render(<Default onSignUp={handleSignUp} />);

    await screen.findByTestId('sign-up-dialog');

    const emailInput = await screen.getByLabelText('Email address');
    await userEvent.type(emailInput, signUpRequest.email);

    const passwordInput = await screen.getByLabelText('Password');
    await userEvent.type(passwordInput, signUpRequest.password);

    const passwordConfirmationInput = await screen.getByLabelText('Password Confirmation');
    await userEvent.type(passwordConfirmationInput, signUpRequest.passwordConfirmation);  

    const signUpButton = screen.getByRole('button', {
      name: /sign up/i
    });
    await userEvent.click(signUpButton);

    waitFor(() => expect(handleSignUp).toHaveBeenCalledWith(authTokenMock));
  });
});

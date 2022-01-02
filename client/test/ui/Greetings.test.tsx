import { render, screen } from '@testing-library/react';
import React from 'react';
import Greetings from '../../src/ui/Greetings';

describe('when rendered with a `name` prop', () => {
  it('should paste it into the greetings text', () => {
    render(<Greetings name="Test Name" />);
    expect(screen.getByText(/Hello Test Name!/)).toBeInTheDocument();
  });
});

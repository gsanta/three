import { render, screen } from '@testing-library/react';
import Index from '@/../pages';
import React from 'react';

describe('Index page', () => {
  it ('renders the page', () => {
    render(<Index />);

    expect(screen.getByText('Index page')).toBeInTheDocument();
  });
});

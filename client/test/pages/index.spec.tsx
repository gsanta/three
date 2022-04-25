import React from 'react';
import { render, screen } from '@testing-library/react';
import Index from '@/../pages';

describe('Index page', () => {
  it('renders the page', () => {
    render(<Index />);

    expect(screen.getByTestId('editor-canvas')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Root from '@/ui/components/AppContainer';

describe('Index page', () => {
  it('renders the page', () => {
    render(<Root />);

    expect(screen.getByTestId('editor-canvas')).toBeInTheDocument();
  });
});

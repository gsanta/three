import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '@/ui/components/App';

describe('Index page', () => {
  it('renders the page', () => {
    render(<App />);

    expect(screen.getByTestId('editor-canvas')).toBeInTheDocument();
  });
});

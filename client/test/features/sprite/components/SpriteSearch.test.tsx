import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import SpriteSearch from '../../../../src/features/sprite/components/SpriteSearch';
import store from '../../../../src/ui/store';

describe('Component: SpriteSearch', () => {
  it('displays a list of sprites', async () => {
    render(
      <Provider store={store}>
        <SpriteSearch />
      </Provider>,
    );

    const displayedTasks = await screen.findByTestId('spritesheet-item');
    expect(displayedTasks.textContent).toBe('player');
  });
});

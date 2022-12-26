import React from 'react';
import { render, screen } from '@testing-library/react';
import AppContainer from '@/ui/components/AppContainer';

describe('Index page', () => {
  it('renders the page', () => {
    render(
      <AppContainer
        app={{
          editorApi: undefined,
          toolStore: new ToolStore(),
          editorStore: undefined,
          editorEvents: new EditorEvents(),
          moduleManager: new ModuleManager(),
          keyboardHandler: new KeyboardHandler(),
          windowHandler: new WindowHandler(),
          layerHandler: undefined,
        }}
      />,
    );

    expect(screen.getByTestId('editor-canvas')).toBeInTheDocument();
  });
});

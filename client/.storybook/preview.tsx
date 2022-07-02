import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '../src/ui/customTheme';
import {queryClient} from '../src/queryClient';
import DataContext from '../src/ui/DataContext';
import Editor from '../src/Editor';
import { initialize, mswDecorator } from 'msw-storybook-addon';

initialize();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (storyFn: () => JSX.Element) => {
  queryClient.clear();
  const editor = new Editor(canvas, canvasContext, webGLContext);

    return (
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={customTheme}>
          <DataContext.Provider
          value={{
            canvas: editor?.canvasStore,
            mouseInput: editor?.mouseInput,
            palette: editor?.paletteStore,
            toolStore: editor?.toolStore,
            userStore: editor?.userStore,
          }}
        >
            <div className="story-container">{storyFn()}</div>
        </DataContext.Provider>
          </ChakraProvider>
        </QueryClientProvider>
    );
  },
  mswDecorator
];

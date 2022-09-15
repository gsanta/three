import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { queryClient } from '../src/queryClient';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import theme from '../src/ui/components/theme';

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
    // const editor = new Editor(canvas, canvasContext, webGLContext);

    return (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme} cssVarsRoot="body">
          {storyFn()}
        </ChakraProvider>
      </QueryClientProvider>
    );
  },
  mswDecorator
];

import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '../src/ui/customTheme';
import {queryClient} from '../src/queryClient';
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

    return (
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={customTheme}>
            <div className="story-container">{storyFn()}</div>
          </ChakraProvider>
        </QueryClientProvider>
    );
  },
  mswDecorator
];

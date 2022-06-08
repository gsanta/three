import { QueryClientProvider } from 'react-query';

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
              <div className="story-container">{storyFn()}</div>
        </QueryClientProvider>
    );
  },
];

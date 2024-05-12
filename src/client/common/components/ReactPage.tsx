import React from 'react';
import { createRoot } from 'react-dom/client';

type ReactComponent = Parameters<typeof React.createElement>[0];
type ReactProps = Parameters<typeof React.createElement>[1];

declare global {
  interface Window {
    pageProps: ReactProps;
  }
}

export function renderPageComponent(Page: ReactComponent) {
  const root = createRoot(document.getElementById('react-mount')!);

  root.render(<Page {...window.pageProps} />);

  return () => root.render(<Page {...window.pageProps} />);
}

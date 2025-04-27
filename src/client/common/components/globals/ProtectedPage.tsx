import { EditorContext } from '@/app/editor/useEditorContext';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import EditorContextType, { setupEditor } from '@/client/editor/setupEditor';

type ProtectedPageProps = {
  children: ReactNode;
};

const StoreSetup = ({ children }: { children: ReactNode }): JSX.Element => {
  return <>{children}</>;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
  },
});

const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const editorContext = React.useRef<EditorContextType | undefined>(undefined);

  if (!editorContext.current) {
    editorContext.current = setupEditor();
  }

  return (
    <QueryClientProvider client={queryClient}>
      <EditorContext.Provider value={editorContext.current}>
        <StoreSetup>{children}</StoreSetup>
      </EditorContext.Provider>
    </QueryClientProvider>
  );
};

export default ProtectedPage;

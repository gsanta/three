import { setUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/hooks';
import { store } from '@/utils/store';
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

type ProtectedPageProps = {
  children: ReactNode;
};

const StoreSetup = ({ children }: { children: ReactNode }): JSX.Element => {
  const globalProps = window.globalProps;

  const dispatch = useAppDispatch();

  dispatch(setUser(globalProps.user));

  return <>{children}</>;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
  },
});

const ProtectedPage = ({ children }: ProtectedPageProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <StoreSetup>{children}</StoreSetup>
      </Provider>
    </QueryClientProvider>
  );
};

export default ProtectedPage;

import { setUser } from '../../features/user/userSlice';
import { useAppDispatch } from '@/common/hooks/hooks';
import { store } from '@/common/utils/store';
import React, { ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

type ProtectedPageProps = {
  children: ReactNode;
};

const StoreSetup = ({ children }: { children: ReactNode }): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const globalProps = window.globalProps || { user: { isLoggedIn: false } };

    dispatch(setUser(globalProps.user));
  }, [dispatch]);

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

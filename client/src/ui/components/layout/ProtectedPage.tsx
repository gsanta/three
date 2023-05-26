import { setLoggedIn } from '@/features/user/userSlice';
import { useAppDispatch } from '@/hooks';
import { store } from '@/store';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

type ProtectedPageProps = {
  children: ReactNode;
};

const StoreSetup = ({ children }: { children: ReactNode }): JSX.Element => {
  const globalProps = window.globalProps;

  const dispatch = useAppDispatch();

  dispatch(setLoggedIn(globalProps.user.isLoggedIn));

  return <>{children}</>;
};

const ProtectedPage = ({ children }: ProtectedPageProps) => {
  return (
    <Provider store={store}>
      <StoreSetup>{children}</StoreSetup>
    </Provider>
  );
};

export default ProtectedPage;

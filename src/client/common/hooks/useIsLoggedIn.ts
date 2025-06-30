import { useSession } from 'next-auth/react';

const useIsLoggedIn = () => {
  const { data: session } = useSession();
  return session?.user?.id;
};

export default useIsLoggedIn;

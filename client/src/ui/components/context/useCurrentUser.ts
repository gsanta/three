import apiInstance from '@/api/apiInstance';
import { currentUserPath, currentUserPathKey } from '@/apiRoutes';
import { useQuery } from 'react-query';

const useCurrentUser = () => {
  const { data: currentUserData } = useQuery(currentUserPathKey(), () => apiInstance.get(currentUserPath()));

  
};

export default useCurrentUser;

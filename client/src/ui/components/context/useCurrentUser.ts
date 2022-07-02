import apiInstance from '@/api/apiInstance';
import { currentUserPath, currentUserPathKey } from '@/apiRoutes';
import DataContext from '@/ui/DataContext';
import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';

type CurrentUserResponse = {
  email: string;
};

const useCurrentUser = () => {
  const { userStore } = useContext(DataContext);

  useQuery<AxiosResponse<CurrentUserResponse>>(currentUserPathKey(), () => apiInstance.get(currentUserPath()), {
    onSuccess(data) {
      if (userStore) {
        userStore.email = data.data.email;
      }
    },
  });
};

export default useCurrentUser;

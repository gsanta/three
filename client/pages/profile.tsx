import User from '@/pages/profile/types/User';
import UserResponse from '@/pages/profile/types/UserResponse';
import axios from 'axios';

type Props = {
  user: User;
};

const Page = ({ user }: Props): JSX.Element => {
  return <>{user.email}</>;
};

export async function getServerSideProps() {
  const res = await axios.get<{ data: UserResponse }>('http://localhost:3000/api/v1/users/3');
  const user: User = {
    email: res.data.data.attributes.email,
  };

  return { props: { user } };
}

export default Page;

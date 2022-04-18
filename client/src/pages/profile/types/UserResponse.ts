interface UserResponse {
  id: number;
  type: 'users';
  attributes: {
    email: string;
  };
}

export default UserResponse;

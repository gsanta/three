import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isLoggedIn: boolean;
  email?: string;
}

export const initialUserState: UserState = {
  isLoggedIn: false,
  email: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.email = action.payload.email;
    },

    signOut: (state) => {
      state.isLoggedIn = false;
      state.email = undefined;
    },
  },
});

export const { signOut, setUser } = userSlice.actions;

export default userSlice.reducer;

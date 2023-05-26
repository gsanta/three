import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToolState {
  isLoggedIn: boolean;
}

const initialState: ToolState = {
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoggedIn } = userSlice.actions;

export default userSlice.reducer;

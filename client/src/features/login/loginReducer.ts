import { createAction, createReducer } from '@reduxjs/toolkit';

interface LoginReducerState {
  isDialogOpen: boolean;
}

const initialState: LoginReducerState = {
  isDialogOpen: false,
};

export const openLoginDialogAction = createAction<boolean>('login/openDialog');

const loginReducer = createReducer(initialState, (builder) => {
  builder.addCase(openLoginDialogAction, (state, action) => {
    state.isDialogOpen = action.payload;
  });
});

export default loginReducer;

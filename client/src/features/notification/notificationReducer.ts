import { createAction, createReducer } from '@reduxjs/toolkit';

interface NotificationReducerState {
  notifications: string[];
}

const initialState: NotificationReducerState = {
  notifications: [],
};

export const addNotificationAction = createAction<string>('notification/add');

const notificationReducer = createReducer(initialState, (builder) => {
  builder.addCase(addNotificationAction, (state, action) => {
    state.notifications.push(action.payload);
  });
});

export default notificationReducer;

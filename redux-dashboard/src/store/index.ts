import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import notificationsReducer from './notificationsSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



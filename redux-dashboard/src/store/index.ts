import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import notificationsReducer from './notificationsSlice';
import logsReducer from './logsSlice';
import { loggerMiddleware } from './loggerMiddleware';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    notifications: notificationsReducer,
    logs: logsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



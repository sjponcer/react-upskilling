import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Notification, type Toast } from '../types';

interface NotificationsState {
  notifications: Notification[];
  toasts: Toast[];
}

const initialState: NotificationsState = {
  notifications: [],
  toasts: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
      // TODO: Implement addNotification
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      // TODO: Implement markAsRead
    },
    markAllAsRead: (state) => {
      // TODO: Implement markAllAsRead
    },
    clearNotifications: (state) => {
      // TODO: Implement clearNotifications
    },
    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      // TODO: Implement addToast
    },
    removeToast: (state, action: PayloadAction<string>) => {
      // TODO: Implement removeToast
    },
  },
});

export const { 
  addNotification, 
  markAsRead, 
  markAllAsRead, 
  clearNotifications,
  addToast,
  removeToast 
} = notificationsSlice.actions;

export default notificationsSlice.reducer;



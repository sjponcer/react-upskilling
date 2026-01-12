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
      const newNotification: Notification = {
        ...action.payload,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        read: false,
      };
      state.notifications.unshift(newNotification);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const newToast: Toast = {
        ...action.payload,
        id: crypto.randomUUID(),
      };
      state.toasts.push(newToast);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(t => t.id !== action.payload);
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



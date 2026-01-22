import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface LogEntry {
  id: string;
  timestamp: string;
  action: string;
  type: 'items' | 'notifications' | 'system';
  details?: string;
}

interface LogsState {
  logs: LogEntry[];
  maxLogs: number;
}

const initialState: LogsState = {
  logs: [],
  maxLogs: 50, // Límite de logs en memoria
};

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<Omit<LogEntry, 'id' | 'timestamp'>>) => {
      const newLog: LogEntry = {
        ...action.payload,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      };
      
      state.logs.unshift(newLog); // Agregar al inicio
      
      // Mantener solo los últimos maxLogs
      if (state.logs.length > state.maxLogs) {
        state.logs = state.logs.slice(0, state.maxLogs);
      }
    },
    clearLogs: (state) => {
      state.logs = [];
    },
  },
});

export const { addLog, clearLogs } = logsSlice.actions;
export default logsSlice.reducer;


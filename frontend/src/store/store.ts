import { configureStore } from '@reduxjs/toolkit';
import systemReducer from './systemSlice';
import userReducer from './userSlice';
import itemsReducer from './itemSlice';

export const store = configureStore({
  reducer: {
    system: systemReducer,
    user: userReducer,
    items: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

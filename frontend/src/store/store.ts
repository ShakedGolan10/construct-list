import { configureStore, Middleware } from '@reduxjs/toolkit';
import systemReducer from './systemSlice';
import userReducer from './userSlice';
import itemsReducer from './itemSlice';

const actionLogger: Middleware = (_storeAPI) => (next) => (action) => {
  console.log('Dispatching action:', action);
  const result = next(action);
  // console.log('Next state:', storeAPI.getState())
  return result;
};
export const store = configureStore({
  reducer: {
    system: systemReducer,
    user: userReducer,
    items: itemsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

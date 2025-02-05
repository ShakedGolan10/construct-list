import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { isLoggedIn } from '../services/auth.service';
import { User } from '../types/app-types';

export interface UserState {
  user: User;
  authChecked: boolean;
  error?: string;
}

const initialState: UserState = {
  user: {
    id: '',
    fullname: '',
    email: '',
  },
  authChecked: false,
};

export const checkAuth = createAsyncThunk('user/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const user = await isLoggedIn();
    return user;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.user.id = action.payload.user.id;
      state.user.fullname = action.payload.user.fullname;
      state.user.email = action.payload.user.email;
    },
    clearUser(state) {
      state.user.id = '';
      state.user.fullname = '';
      state.user.email = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      if (action.payload && action.payload.id) {
        state.user.id = action.payload.id;
        state.user.fullname = action.payload.fullname;
        state.user.email = action.payload.email;
      } else {
        state.user.id = '';
        state.user.fullname = '';
        state.user.email = '';
      }
      state.authChecked = true;
    }),
      builder.addCase(checkAuth.rejected, (state, action) => {
        state.user.id = '';
        state.user.fullname = '';
        state.user.email = '';
        state.authChecked = true;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

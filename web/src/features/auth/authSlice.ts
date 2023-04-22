import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IToken, LoginData, User, UserData } from './authTypes';
import { login, logout, register } from './authService';
import { AxiosError } from 'axios';

const user = JSON.parse(localStorage.getItem('user')!);

const initialState: User = {
  user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const registerUser = createAsyncThunk<
  IToken,
  UserData,
  { rejectValue: string }
>('auth/register', async (userData: UserData, { rejectWithValue }) => {
  try {
    return await register(userData);
  } catch (error) {
    if (error instanceof AxiosError) {
      const err = error?.response?.data?.message;

      return rejectWithValue(err || error.toString());
    }
  }
});

export const loginUser = createAsyncThunk<
  IToken,
  LoginData,
  { rejectValue: string }
>('auth/login', async (userData: LoginData, { rejectWithValue }) => {
  try {
    return await login(userData);
  } catch (error) {
    if (error instanceof AxiosError) {
      const err = error?.response?.data?.message;
      return rejectWithValue(err || error.toString());
    }
  }
});

export const logoutUser = createAsyncThunk('auth/logout', () => {
  logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;

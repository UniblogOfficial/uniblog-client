import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { batch } from 'react-redux';

import { removeUserData, setAppStatus, setInitialized, setMLDraftName, setUserData } from '.';

import { AppThunk, store } from 'bll/store';
import { AppStatus } from 'common/constants';
import { Nullable, TUser } from 'common/types/instance';
import { TLoginDto, TRegisterDto } from 'common/types/request/auth.dto';
import { handleServerNetworkError } from 'common/utils/state/errorHandler';
import { authAPI } from 'dal';

const initialState: TAuthState = {
  registerUserData: null,
  loginUserData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRegisterUserData(state, action: PayloadAction<Nullable<TRegisterDto>>) {
      state.registerUserData = action.payload;
    },
    setLoginUserData(state, action: PayloadAction<TLoginDto>) {
      state.loginUserData = action.payload;
    },
  },
});

export const { setLoginUserData, setRegisterUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;

// thunks

export const requestLogin = createAsyncThunk(
  'auth/requestLogin',
  async (dto: TLoginDto, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(setAppStatus(AppStatus.AUTH_LOADING));
      const response = await authAPI.login(dto);
      dispatch(setUserData(response.data));
      dispatch(setAppStatus(AppStatus.SUCCEEDED));
      console.log(store.getState());
    } catch (e) {
      handleServerNetworkError(e, AppStatus.AUTH_FAILED, dispatch);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch, rejectWithValue }) => {
  authAPI.logout();
  // @ts-ignore
  dispatch(removeUserData());
});

export const requestMe = createAsyncThunk(
  'auth/requestMe',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus(AppStatus.AUTH_LOADING));
      const response = await authAPI.me();
      batch(() => {
        dispatch(setUserData(response.data));
        dispatch(setMLDraftName((response.data as TUser).name));
        // dispatch(setMLDraftLogoFromUserAvatar((response.data as TUser).avatar));
        dispatch(setInitialized());
        dispatch(setAppStatus(AppStatus.SUCCEEDED));
      });
    } catch (e) {
      handleServerNetworkError(e, AppStatus.AUTH_FAILED, dispatch);
      dispatch(setInitialized());
    }
  },
);

export const requestRegister = createAsyncThunk(
  'auth/requestRegister',
  async (dto: TRegisterDto, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus(AppStatus.AUTH_LOADING));
      const response = await authAPI.register(dto);
      const { accessLevel } = response.data;
      batch(() => {
        dispatch(setUserData(response.data));
        dispatch(setAppStatus(AppStatus.SUCCEEDED));
      });
    } catch (e) {
      handleServerNetworkError(e, AppStatus.AUTH_FAILED, dispatch);
    }
  },
);

// types

export type TAuthState = {
  registerUserData: Nullable<TRegisterDto>;
  loginUserData: Nullable<TLoginDto>;
};
export type TAuthActions =
  | ReturnType<typeof setRegisterUserData>
  | ReturnType<typeof setLoginUserData>;

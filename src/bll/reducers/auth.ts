import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { batch } from 'react-redux';

import { removeUserData, setAppStatus, setInitialized, setMLDraftName, setUserData } from '.';

import { AppThunk, store } from 'bll/store';
import { AppStatus } from 'common/constants';
import { Nullable, TUser } from 'common/types/instance';
import { TLoginDto, TRegisterDto } from 'common/types/request/auth.dto';
import { handleServerNetworkError } from 'common/utils/state/errorHandler';
import { authAPI } from 'dal';

enum AuthActionType {
  SET_REGISTER_USER_DATA = 'SET_REGISTER_USER_DATA',
  SET_LOGIN_USER_DATA = 'SET_LOGIN_USER_DATA',
}

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

// export const authReducer = (state: TAuthState = initialState, action: TAuthActions): TAuthState => {
//   switch (action.type) {
//     case AuthActionType.SET_REGISTER_USER_DATA:
//     case AuthActionType.SET_LOGIN_USER_DATA:
//       return { ...state, ...action.payload };
//     default:
//       return state;
//   }
// };

export const { setLoginUserData, setRegisterUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;
// actions
// export const setRegisterUserData = (data: Nullable<TRegisterDto>) =>
//   ({ type: AuthActionType.SET_REGISTER_USER_DATA, payload: { signupUserData: data } } as const);
// export const setLoginUserData = (data: Nullable<TLoginDto>) =>
//   ({ type: AuthActionType.SET_LOGIN_USER_DATA, payload: { loginUserData: data } } as const);

// thunks

// export const requestLogin =
//   (dto: TLoginDto): AppThunk =>
//   async (dispatch, getState) => {
//     try {
//       dispatch(setAppStatus(AppStatus.AUTH_LOADING));
//       const response = await authAPI.login(dto);
//       dispatch(setUserData(response.data));
//       dispatch(setAppStatus(AppStatus.SUCCEEDED));
//       console.log(store.getState());
//     } catch (e) {
//       handleServerNetworkError(e, AppStatus.AUTH_FAILED, dispatch);
//     }
//   };

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

// export const logout = (): AppThunk => async dispatch => {
//   authAPI.logout();
//   // @ts-ignore
//   dispatch(removeUserData());
// };

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch, rejectWithValue }) => {
  authAPI.logout();
  // @ts-ignore
  dispatch(removeUserData());
});

// export const requestMe = (): AppThunk => async dispatch => {
//   try {
//     dispatch(setAppStatus(AppStatus.AUTH_LOADING));
//     const response = await authAPI.me();
//     batch(() => {
//       dispatch(setUserData(response.data));
//       dispatch(setMLDraftName((response.data as TUser).name));
//       // dispatch(setMLDraftLogoFromUserAvatar((response.data as TUser).avatar));
//       dispatch(setInitialized());
//       dispatch(setAppStatus(AppStatus.SUCCEEDED));
//     });
//   } catch (e) {
//     handleServerNetworkError(e, AppStatus.AUTH_FAILED, dispatch);
//     dispatch(setInitialized());
//   }
// };

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

// export const requestRegister =
//   (dto: TRegisterDto): AppThunk =>
//   async (dispatch, getState) => {
//     try {
//       dispatch(setAppStatus(AppStatus.AUTH_LOADING));
//       const response = await authAPI.register(dto);
//       const { accessLevel } = response.data;
//       batch(() => {
//         dispatch(setUserData(response.data));
//         dispatch(setAppStatus(AppStatus.SUCCEEDED));
//       });
//     } catch (e) {
//       handleServerNetworkError(e, AppStatus.AUTH_FAILED, dispatch);
//     }
//   };

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

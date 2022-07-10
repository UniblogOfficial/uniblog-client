import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { call, put, takeEvery } from 'redux-saga/effects';

import { ResponseAuthMeType, ResponseLoginType } from '../../common/types/response/auth';

import { removeUserData, setAppStatus, setInitialized, setMLDraftName, setUserData } from '.';

import { AppStatus } from 'common/constants';
import { Nullable, TUser } from 'common/types/instance';
import { TLoginDto, TRegisterDto } from 'common/types/request/auth.dto';
import {
  handleServerNetworkError,
  handleServerNetworkErrorSaga,
} from 'common/utils/state/errorHandler';
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

// sagas

export function* requestLoginWorkerSaga(action: ReturnType<typeof requestLogin>) {
  yield put(setAppStatus(AppStatus.AUTH_LOADING));
  try {
    const response: ResponseLoginType = yield call(authAPI.login, action.dto);
    yield put(setUserData(response.data));
    yield put(setAppStatus(AppStatus.SUCCEEDED));
  } catch (e) {
    return handleServerNetworkErrorSaga(e, AppStatus.AUTH_FAILED);
  }
}
export function* logoutWorkerSaga() {
  yield call(authAPI.logout);
  yield put(removeUserData({}));
}
export function* requestMeWorkerSaga() {
  try {
    yield put(setAppStatus(AppStatus.AUTH_LOADING));
    // @ts-ignore
    const response = yield call(authAPI.me);
    yield put(setUserData(response.data));
    yield put(setMLDraftName((response.data as TUser).name));
    // dispatch(setMLDraftLogoFromUserAvatar((response.data as TUser).avatar));
    yield put(setInitialized());
    yield put(setAppStatus(AppStatus.SUCCEEDED));
  } catch (e) {
    handleServerNetworkErrorSaga(e, AppStatus.AUTH_FAILED);
    yield put(setInitialized());
  }
}
export function* requestRegisterWorkerSaga(action: ReturnType<typeof requestRegister>) {
  try {
    yield put(setAppStatus(AppStatus.AUTH_LOADING));
    // @ts-ignore
    const response = yield call(authAPI.register, action.dto);
    const { accessLevel } = response.data;
    yield put(setUserData(response.data));
    yield put(setAppStatus(AppStatus.SUCCEEDED));
  } catch (e) {
    handleServerNetworkErrorSaga(e, AppStatus.AUTH_FAILED);
  }
}

export const logout = () => ({ type: 'auth/logout' } as const);
export const requestLogin = (dto: TLoginDto) => ({ type: 'auth/requestLogin', dto } as const);
export const requestRegister = (dto: TRegisterDto) => ({ type: 'auth/requestLogin', dto } as const);
// export const requestMe = () => ({ type: 'auth/requestMe' } as const);

export function* requestLoginWatcher() {
  yield takeEvery('auth/requestLogin', requestLoginWorkerSaga);
  yield takeEvery('auth/logout', logoutWorkerSaga);
  yield takeEvery('auth/requestMe', requestMeWorkerSaga);
  yield takeEvery('auth/requestRegister', requestRegisterWorkerSaga);
}

// thunks

// export const requestLogin = createAsyncThunk(
//   'auth/requestLogin',
//   async (dto: TLoginDto, { dispatch, rejectWithValue, getState }) => {
//     try {
//       dispatch(setAppStatus(AppStatus.AUTH_LOADING));
//       const response = await authAPI.login(dto);
//       dispatch(setUserData(response.data));
//       dispatch(setAppStatus(AppStatus.SUCCEEDED));
//       console.log(store.getState());
//     } catch (e) {
//       handleServerNetworkError(e, AppStatus.AUTH_FAILED, dispatch);
//     }
//   },
// );

// export const logout = createAsyncThunk('auth/logout', async (_, { dispatch, rejectWithValue }) => {
//   authAPI.logout();
//   dispatch(removeUserData({}));
// });

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

// export const requestRegister = createAsyncThunk(
//   'auth/requestRegister',
//   async (dto: TRegisterDto, { dispatch, rejectWithValue }) => {
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
//   },
// );

// types

export type TAuthState = {
  registerUserData: Nullable<TRegisterDto>;
  loginUserData: Nullable<TLoginDto>;
};
export type TAuthActions =
  | ReturnType<typeof setRegisterUserData>
  | ReturnType<typeof setLoginUserData>;

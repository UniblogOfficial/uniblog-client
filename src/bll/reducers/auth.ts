import { batch } from 'react-redux';

import { AppStatus } from '../../common/constants';
import { Nullable } from '../../common/types/instance';
import { TRegisterDto, TLoginDto } from '../../common/types/request/auth.dto';
import { handleServerNetworkError } from '../../common/utils/state/errorHandler';
import { authAPI } from '../../dal';
import { AppThunk } from '../store';

import { setAppStatus, setInitialized } from '.';

enum AuthActionType {
  SET_USER_DATA = 'SET_USER_DATA',
  SET_REGISTER_USER_DATA = 'SET_REGISTER_USER_DATA',
  SET_LOGIN_USER_DATA = 'SET_LOGIN_USER_DATA',
}

export enum Role {
  UNREGISTERED = 'UNREGISTERED',
  USER = 'USER',
  ADMIN = 'ADMIN',
  MASTER = 'MASTER',
}

export type TUserData = {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActivated?: boolean;
};

const initialState: TAuthState = {
  registerUserData: null,
  loginUserData: null,
  userData: null as Nullable<TUserData>,
};

export const authReducer = (state: TAuthState = initialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
    case AuthActionType.SET_USER_DATA:
    case AuthActionType.SET_REGISTER_USER_DATA:
    case AuthActionType.SET_LOGIN_USER_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// actions

export const setUserData = (userData: TUserData | null) =>
  ({ type: AuthActionType.SET_USER_DATA, payload: { userData } } as const);
export const setRegisterUserData = (data: Nullable<TRegisterDto>) =>
  ({ type: AuthActionType.SET_REGISTER_USER_DATA, payload: { signupUserData: data } } as const);
export const setLoginUserData = (data: Nullable<TLoginDto>) =>
  ({ type: AuthActionType.SET_LOGIN_USER_DATA, payload: { loginUserData: data } } as const);

// thunks

export const requestLogin =
  (dto: TLoginDto): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setAppStatus(AppStatus.AUTH_LOADING));
      const response = await authAPI.login(dto);
      dispatch(setUserData(response.data));
      dispatch(setAppStatus(AppStatus.SUCCEEDED));
    } catch (e) {
      handleServerNetworkError(e, AppStatus.AUTH_FAILED, dispatch);
    }
  };

export const logout = (): AppThunk => async dispatch => {
  /* try {
    dispatch(setAppStatus('auth loading'));
    batch(() => {
      dispatch(setIsLoggedIn(false));
      dispatch(setIsSignupPassConfirmed(null));
      dispatch(setSignupUserData(null));
    });
    const response = await authAPI.logout();
    dispatch(setUserData(response.data));
    dispatch(getCartItems());
    dispatch(setAppStatus('succeeded'));
  } catch (e) {
    handleServerNetworkError(e, 'auth', dispatch);
  } */
};

export const requestMe = (): AppThunk => async dispatch => {
  try {
    dispatch(setAppStatus(AppStatus.AUTH_LOADING));
    const response = await authAPI.me();
    batch(() => {
      dispatch(setUserData(response.data));
      dispatch(setInitialized());
      dispatch(setAppStatus(AppStatus.SUCCEEDED));
    });
  } catch (e) {
    handleServerNetworkError(e, AppStatus.AUTH_FAILED, dispatch);
    dispatch(setInitialized());
  }
};

export const requestRegister =
  (dto: TRegisterDto): AppThunk =>
  async (dispatch, getState) => {
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
  };

// types

export type TAuthState = {
  registerUserData: Nullable<TRegisterDto>;
  loginUserData: Nullable<TLoginDto>;
  userData: Nullable<TUserData>;
};
export type TAuthActions =
  | ReturnType<typeof setUserData>
  | ReturnType<typeof setRegisterUserData>
  | ReturnType<typeof setLoginUserData>;

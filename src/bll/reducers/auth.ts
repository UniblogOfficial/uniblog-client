import { batch } from 'react-redux';

import { Nullable } from '../../common/types/instance';
import { handleServerNetworkError } from '../../common/utils/state/errorHandler';
import { AppThunk } from '../store';

import { setAppStatus, setInitialized } from '.';

export enum AccessLevel {
  UNREGISTERED = 0,
  REGISTERED = 1,
  ADMIN = 2,
  MASTER = 3,
}

export type TUserData = {
  id: string;
  name: string;
  email: string;
  accessLevel: AccessLevel;
  isActivated?: boolean;
};

export type TLoginData = {
  email: string;
  password: string;
};

export type TSignupData = {
  name: string;
  email: string;
  password: string;
};

const initialState = {
  signupUserData: null as Nullable<TSignupData>,
  isSignupPassConfirmed: null as Nullable<boolean>,
  // isRegistered: false,
  isLoggedIn: false,

  loginUserData: null as Nullable<TLoginData>,

  userData: null as Nullable<TUserData>,
};

export const authReducer = (state: TAuthState = initialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
    case 'AUTH/SET_USER_DATA':
    case 'AUTH/SET_IS_SIGNUP_PASS_CONFIRMED':
    case 'AUTH/SET_SIGNUP_USER_DATA':
    case 'AUTH/SET_LOGIN_USER_DATA':
    // case 'AUTH/SET_IS_REGISTERED':
    case 'AUTH/SET_IS_LOGGED_IN':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// actions

export const setUserData = (userData: TUserData | null) =>
  ({ type: 'AUTH/SET_USER_DATA', payload: { userData } } as const);
export const setSignupUserData = (data: Nullable<TSignupData>) =>
  ({ type: 'AUTH/SET_SIGNUP_USER_DATA', payload: { signupUserData: data } } as const);
export const setLoginUserData = (data: Nullable<TLoginData>) =>
  ({ type: 'AUTH/SET_LOGIN_USER_DATA', payload: { loginUserData: data } } as const);
export const setIsSignupPassConfirmed = (value: Nullable<boolean>) =>
  ({
    type: 'AUTH/SET_IS_SIGNUP_PASS_CONFIRMED',
    payload: { isSignupPassConfirmed: value },
  } as const);
// export const setIsRegistered = (status: boolean) =>
// ({ type: 'AUTH/SET_IS_REGISTERED', payload: { isRegistered: status }} as const)
export const setIsLoggedIn = (status: boolean) =>
  ({ type: 'AUTH/SET_IS_LOGGED_IN', payload: { isLoggedIn: status } } as const);

// thunks

export const login = (): AppThunk => async (dispatch, getState) => {
  /* try {
    dispatch(setAppStatus('auth loading'));
    const loginData = getState().auth.loginUserData as TLoginData;
    const response = await authAPI.login(loginData);
    const { accessLevel } = response.data;
    dispatch(setUserData(response.data));
    if (accessLevel >= AccessLevel.REGISTERED) {
      dispatch(setIsLoggedIn(true));
    }
    dispatch(setAppStatus('succeeded'));
  } catch (e) {
    handleServerNetworkError(e, 'auth', dispatch);
  } */
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

export const me = (): AppThunk => async dispatch => {
  /* try {
    dispatch(setAppStatus('auth loading'));
    const response = await authAPI.me();
    dispatch(setUserData(response.data));
    if (response.data.accessLevel >= AccessLevel.REGISTERED) {
      dispatch(setIsLoggedIn(true));
    }
    dispatch(getCartItems());
    dispatch(setInitialized());
    dispatch(setAppStatus('succeeded'));
  } catch (e) {
    handleServerNetworkError(e, 'auth', dispatch);
    dispatch(setInitialized());
  } */
};

export const signup = (): AppThunk => async (dispatch, getState) => {
  /* try {
    dispatch(setAppStatus('auth loading'));
    const signupData = getState().auth.signupUserData as TSignupData;
    const response = await authAPI.register(signupData);
    const { accessLevel } = response.data;
    dispatch(setUserData(response.data));
    if (accessLevel >= AccessLevel.REGISTERED) {
      batch(() => {
        dispatch(setIsSignupPassConfirmed(null));
        dispatch(setSignupUserData(null));
        dispatch(setIsLoggedIn(true));
      });
    }
    dispatch(setAppStatus('succeeded'));
  } catch (e) {
    handleServerNetworkError(e, 'auth', dispatch);
  } */
};

// types

export type TAuthState = typeof initialState;
export type TAuthActions =
  | ReturnType<typeof setUserData>
  | ReturnType<typeof setIsLoggedIn>
  | ReturnType<typeof setSignupUserData>
  | ReturnType<typeof setLoginUserData>
  | ReturnType<typeof setIsSignupPassConfirmed>;
// | ReturnType<typeof setIsRegistered>

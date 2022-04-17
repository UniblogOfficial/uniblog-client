import { Nullable } from '../../common/types/instance';

const initialState = {
  status: 'idle' as TRequestStatus,
  error: null as Nullable<string>,
  isLoaded: false,
  isInitialized: false,
  isNeedUpdate: true,
};

export const appReducer = (state: TAppState = initialState, action: TAppActions): TAppState => {
  switch (action.type) {
    case appActionVariables.SET_LOADED:
    case appActionVariables.SET_INITIALIZED:
    case appActionVariables.SET_STATUS:
    case appActionVariables.SER_ERROR:
    case appActionVariables.SET_NEED_UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// actions
export const setAppStatus = (status: TRequestStatus) =>
  ({ type: appActionVariables.SET_STATUS, payload: { status } } as const);
export const setError = (error: Nullable<string>) =>
  ({ type: appActionVariables.SER_ERROR, payload: { error } } as const);
export const setInitialized = () =>
  ({
    type: appActionVariables.SET_INITIALIZED,
    payload: { isInitialized: true },
  } as const);
export const setLoaded = () =>
  ({
    type: appActionVariables.SET_LOADED,
    payload: { isLoaded: true },
  } as const);
export const setNeedUpdate = (isNeedUpdate: boolean) =>
  ({ type: appActionVariables.SET_NEED_UPDATE, payload: { isNeedUpdate } } as const);
// thunks

// types
export type TRequestStatus =
  | 'idle'
  | 'succeeded'
  | 'auth loading'
  | 'content loading'
  | 'user data loading'
  | 'auth failed'
  | 'content failed'
  | 'user data failed';
export type TAppState = typeof initialState;
export type TAppActions =
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setError>
  | ReturnType<typeof setInitialized>
  | ReturnType<typeof setLoaded>
  | ReturnType<typeof setNeedUpdate>;

// variables
const appActionVariables = {
  SET_STATUS: 'APP/SET-STATUS' as const,
  SER_ERROR: 'APP/SET-ERROR' as const,
  SET_LOADED: 'APP/SET-LOADED' as const,
  SET_INITIALIZED: 'APP/SET-INITIALIZED' as const,
  SET_NEED_UPDATE: 'APP/SET-NEED-UPDATE' as const,
};

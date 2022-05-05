import { AppStatus } from '../../common/constants/index';
import { Nullable } from '../../common/types/instance';

// variables
enum AppActionType {
  SET_STATUS = 'SET_STATUS',
  SER_ERROR = 'SET_ERROR',
  SET_LOADED = 'SET_LOADED',
  SET_INITIALIZED = 'SET_INITIALIZED',
  SET_NEED_UPDATE = 'SET_NEED_UPDATE',
}

const initialState: TAppState = {
  status: AppStatus.IDLE,
  error: null,
  isLoaded: false,
  isInitialized: false,
  isNeedUpdate: true,
};

export const appReducer = (state: TAppState = initialState, action: TAppActions): TAppState => {
  switch (action.type) {
    case AppActionType.SET_LOADED:
    case AppActionType.SET_INITIALIZED:
    case AppActionType.SET_STATUS:
    case AppActionType.SER_ERROR:
    case AppActionType.SET_NEED_UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// actions
export const setAppStatus = (status: AppStatus) =>
  ({ type: AppActionType.SET_STATUS, payload: { status } } as const);
export const setError = (error: Nullable<string>) =>
  ({ type: AppActionType.SER_ERROR, payload: { error } } as const);
export const setInitialized = () =>
  ({
    type: AppActionType.SET_INITIALIZED,
    payload: { isInitialized: true },
  } as const);
export const setLoaded = () =>
  ({
    type: AppActionType.SET_LOADED,
    payload: { isLoaded: true },
  } as const);
export const setNeedUpdate = (isNeedUpdate: boolean) =>
  ({ type: AppActionType.SET_NEED_UPDATE, payload: { isNeedUpdate } } as const);

// types
export type TAppState = {
  status: AppStatus;
  error: Nullable<string>;
  isLoaded: boolean;
  isInitialized: boolean;
  isNeedUpdate: boolean;
};

export type TAppActions =
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setError>
  | ReturnType<typeof setInitialized>
  | ReturnType<typeof setLoaded>
  | ReturnType<typeof setNeedUpdate>;

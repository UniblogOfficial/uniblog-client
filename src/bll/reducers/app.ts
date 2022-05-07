import { AppStatus, PrivatePath, PublicPath } from '../../common/constants';
import { Nullable } from '../../common/types/instance';
import { trim, validateMLRoute } from '../../common/utils/state/index';
import { AppThunk } from '../store';

import { requestMe } from './auth';
import { getMultilink } from './multilink';

// variables
enum AppActionType {
  SET_STATUS = 'SET_STATUS',
  SET_ERROR = 'SET_ERROR',
  SET_LOADED = 'SET_LOADED',
  SET_INITIALIZED = 'SET_INITIALIZED',
  SET_MULTILINK_MODE = 'SET_MULTILINK_MODE',
  SET_NEED_UPDATE = 'SET_NEED_UPDATE',
}

const initialState: TAppState = {
  status: AppStatus.IDLE,
  error: null,
  isLoaded: false,
  isInitialized: false,
  isMultilinkMode: false,
  isNeedUpdate: true, // this flag is used for debouncing
};

export const appReducer = (state: TAppState = initialState, action: TAppActions): TAppState => {
  switch (action.type) {
    case AppActionType.SET_LOADED:
    case AppActionType.SET_INITIALIZED:
    case AppActionType.SET_STATUS:
    case AppActionType.SET_ERROR:
    case AppActionType.SET_MULTILINK_MODE:
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
  ({ type: AppActionType.SET_ERROR, payload: { error } } as const);
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
export const setMultilinkMode = (isMultilinkMode: boolean) =>
  ({ type: AppActionType.SET_MULTILINK_MODE, payload: { isMultilinkMode } } as const);
// thunks
export const initialize =
  (url: string): AppThunk =>
  async dispatch => {
    const isMLRequestAttempt = validateMLRoute(
      [...Object.values(PrivatePath), ...Object.values(PublicPath)],
      url,
    );
    if (isMLRequestAttempt) {
      dispatch(getMultilink(trim(url, '/')));
    }
    if (!isMLRequestAttempt) {
      dispatch(requestMe());
    }
  };

// types
export type TAppState = {
  status: AppStatus;
  error: Nullable<string>;
  isLoaded: boolean;
  isInitialized: boolean;
  isMultilinkMode: boolean;
  isNeedUpdate: boolean;
};

export type TAppActions =
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setError>
  | ReturnType<typeof setInitialized>
  | ReturnType<typeof setLoaded>
  | ReturnType<typeof setMultilinkMode>
  | ReturnType<typeof setNeedUpdate>;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { requestMe, getMultilink, setUserData } from '.';

import { AppThunk, store } from 'bll/store';
import { AppStatus, PrivatePath, PublicPath } from 'common/constants';
import { Nullable } from 'common/types/instance';
import { TLoginDto } from 'common/types/request';
import { handleServerNetworkError, trim, validateMLRoute } from 'common/utils/state';
import { authAPI } from 'dal';

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

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<AppStatus>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<Nullable<string>>) {
      state.error = action.payload;
    },
    setInitialized(state) {
      state.isInitialized = true;
    },
    setLoaded(state) {
      state.isLoaded = true;
    },
    setNeedUpdate(state, action: PayloadAction<boolean>) {
      state.isNeedUpdate = action.payload;
    },
    setMultilinkMode(state, action: PayloadAction<boolean>) {
      state.isMultilinkMode = action.payload;
    },
  },
});

// export const appReducer = (state: TAppState = initialState, action: TAppActions): TAppState => {
//   switch (action.type) {
//     case AppActionType.SET_LOADED:
//     case AppActionType.SET_INITIALIZED:
//     // case AppActionType.SET_STATUS:
//     case AppActionType.SET_ERROR:
//     case AppActionType.SET_MULTILINK_MODE:
//     case AppActionType.SET_NEED_UPDATE:
//       return {
//         ...state,
//         // @ts-ignore
//         ...action.payload,
//       };
//     default:
//       return state;
//   }
// };

// actions
// export const setAppStatus = (status: AppStatus) =>
//   ({ type: AppActionType.SET_STATUS, payload: { status } } as const);

export const {
  setAppStatus,
  setError,
  setInitialized,
  setLoaded,
  setNeedUpdate,
  setMultilinkMode,
} = appSlice.actions;

export const appReducer = appSlice.reducer;

// export const setError = (error: Nullable<string>) =>
//   ({ type: AppActionType.SET_ERROR, payload: { error } } as const);

// export const setInitialized = () =>
//   ({
//     type: AppActionType.SET_INITIALIZED,
//     payload: { isInitialized: true },
//   } as const);
// export const setLoaded = () =>
//   ({
//     type: AppActionType.SET_LOADED,
//     payload: { isLoaded: true },
//   } as const);
// export const setNeedUpdate = (isNeedUpdate: boolean) =>
//   ({ type: AppActionType.SET_NEED_UPDATE, payload: { isNeedUpdate } } as const);
// export const setMultilinkMode = (isMultilinkMode: boolean) =>
//   ({ type: AppActionType.SET_MULTILINK_MODE, payload: { isMultilinkMode } } as const);
// thunks
// export const initialize =
//   (url: string): AppThunk =>
//   async dispatch => {
//     const isMLRequestAttempt = validateMLRoute(
//       [...Object.values(PrivatePath), ...Object.values(PublicPath)],
//       url,
//     );
//     if (isMLRequestAttempt) {
//       dispatch(getMultilink(trim(url, '/')));
//     }
//     if (!isMLRequestAttempt) {
//       dispatch(requestMe());
//     }
//   };

export const initialize = createAsyncThunk('auth/initialize', async (url: string, { dispatch }) => {
  const isMLRequestAttempt = validateMLRoute(
    [...Object.values(PrivatePath), ...Object.values(PublicPath)],
    url,
  );
  if (isMLRequestAttempt) {
    // eslint-disable-next-line no-debugger
    debugger;
    // @ts-ignore
    dispatch(getMultilink(trim(url, '/')));
  }
  if (!isMLRequestAttempt) {
    dispatch(requestMe());
  }
});

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

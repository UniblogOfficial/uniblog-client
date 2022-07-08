import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { ThunkDispatch } from 'redux-thunk';

import { requestMe, getMultilink } from '.';

import { AppStatus, PrivatePath, PublicPath } from 'common/constants';
import { Nullable } from 'common/types/instance';
import { handleServerNetworkError, trim, validateMLRoute } from 'common/utils/state';

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

export const {
  setAppStatus,
  setError,
  setInitialized,
  setLoaded,
  setNeedUpdate,
  setMultilinkMode,
} = appSlice.actions;

export const appReducer = appSlice.reducer;

// sagas
export function* initializeWorkerSaga(action: ReturnType<typeof initializeApp>) {
  const isMLRequestAttempt = validateMLRoute(
    [...Object.values(PrivatePath), ...Object.values(PublicPath)],
    action.url,
  );
  if (isMLRequestAttempt) {
    // need fix types
    // any из-за санки, если все перевести на saga, то такого не будет
    yield put<any>(getMultilink(trim(action.url, '/')));
  }
  if (!isMLRequestAttempt) {
    // need fix types
    // any из-за санки, если все перевести на saga, то такого не будет
    yield put<any>(requestMe());
  }
}
export const initializeApp = (url: string) => ({ type: 'auth/initialize', url } as const);
export function* initializeAppWatcher() {
  yield takeEvery('auth/initialize', initializeWorkerSaga);
}

// export const initialize = createAsyncThunk('auth/initialize', async (url: string, { dispatch }) => {
//   const isMLRequestAttempt = validateMLRoute(
//     [...Object.values(PrivatePath), ...Object.values(PublicPath)],
//     url,
//   );
//   if (isMLRequestAttempt) {
//     dispatch(getMultilink(trim(url, '/')));
//   }
//   if (!isMLRequestAttempt) {
//     dispatch(requestMe());
//   }
// });

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

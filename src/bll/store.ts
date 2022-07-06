import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
  appReducer,
  authReducer,
  userReducer,
  mlDraftReducer,
  multilinkReducer,
  // layoutReducer,
  TAppState,
  TAuthState,
  TUserState,
  TMLDraftState,
  TMultilinkState,
  // TLayoutState,
  TAppActions,
  TAuthActions,
  TMultilinkActions,
  TUserActions,
  TMLDraftActions,
  initializeAppWatcher,

  // TLayoutActions,
} from './reducers';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  mlDraft: mlDraftReducer,
  multilink: multilinkReducer,
});
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, sagaMiddleware],
});
sagaMiddleware.run(rootWatcher);
function* rootWatcher() {
  yield all([initializeAppWatcher()]);
}
// types
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TState, unknown, TActions>;
export type AppThunkDispatch = ThunkDispatch<TState, void, TActions>;
export type RootState = ReturnType<typeof rootReducer>;
export type TState = {
  app: TAppState;
  auth: TAuthState;
  user: TUserState;
  mlDraft: TMLDraftState;
  multilink: TMultilinkState;
};
export type TActions =
  | TAppActions
  | TAuthActions
  | TUserActions
  | TMultilinkActions
  | TMLDraftActions;

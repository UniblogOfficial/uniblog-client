import { configureStore } from '@reduxjs/toolkit';
import { compose, applyMiddleware, combineReducers, createStore } from 'redux';
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

  // TLayoutActions,
} from './reducers';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  mlDraft: mlDraftReducer,
  multilink: multilinkReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});

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

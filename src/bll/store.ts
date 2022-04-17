import { compose, applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
  appReducer,
  authReducer,
  // layoutReducer,
  TAppState,
  TAuthState,
  // TLayoutState,
  TAppActions,
  TAuthActions,
  // TLayoutActions,
} from './reducers';

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware),
  // other store enhancers if any
);

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// types
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TState, unknown, TActions>;
export type AppThunkDispatch = ThunkDispatch<TState, void, TActions>;
export type RootState = ReturnType<typeof rootReducer>;
export type TState = {
  app: TAppState;
  auth: TAuthState;
};
export type TActions = TAppActions | TAuthActions;

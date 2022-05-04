import axios from 'axios';

import { handleServerNetworkError } from '../../common/utils/state/errorHandler';
import { AppThunk } from '../store';

import { setAppStatus } from './app';

enum multilinkAction {
  SET_MULTILINK = 'SET_MULTILINK',
}

const initialState = {};

export const multilinkReducer = (
  state: TMultilinkState = initialState,
  action: TMultilinkActions,
): TMultilinkState => {
  switch (action.type) {
    case multilinkAction.SET_MULTILINK:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
// actions
export const setMultilink = () =>
  ({
    type: multilinkAction.SET_MULTILINK,
    payload: {},
  } as const);

// thunks

export const getMultilink =
  (name: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatus('content loading'));
      const response = await axios.get(
        `https://uniblog-server.herokuapp.com/api/multilink/${name}`,
      );
      dispatch(setAppStatus('succeeded'));
    } catch (e) {
      handleServerNetworkError(e, 'content', dispatch);
    }
  };

// types
export type TMultilinkState = typeof initialState;
export type TMultilinkActions = ReturnType<typeof setMultilink>;

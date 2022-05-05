import axios from 'axios';

import { AppStatus } from '../../common/constants';
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
      dispatch(setAppStatus(AppStatus.CONTENT_LOADING));
      const response = await axios.get(
        `https://uniblog-server.herokuapp.com/api/multilink/${name}`,
      );
      dispatch(setAppStatus(AppStatus.SUCCEEDED));
    } catch (e) {
      handleServerNetworkError(e, AppStatus.CONTENT_FAILED, dispatch);
    }
  };

// types
export type TMultilinkState = typeof initialState;
export type TMultilinkActions = ReturnType<typeof setMultilink>;

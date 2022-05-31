import { batch } from 'react-redux';

import { AppStatus } from '../../common/constants';
import { Nullable, TMultilink } from '../../common/types/instance';
import { handleServerNetworkError } from '../../common/utils/state/errorHandler';
import { normalizeMLPublic } from '../../common/utils/state/normalizeMLPublic';
import { multilinkAPI } from '../../dal';
import { AppThunk } from '../store';

import { setAppStatus, setInitialized, setMultilinkMode } from './app';
import { requestMe } from './auth';

enum multilinkAction {
  SET_MULTILINK = 'SET_MULTILINK',
  SET_ALL_MULTILINKS = 'SET_ALL_MULTILINKS',
}

const initialState = {
  multilink: null,
  allMultilinks: null,
};

export const multilinkReducer = (
  state: TMultilinkState = initialState,
  action: TMultilinkActions,
): TMultilinkState => {
  switch (action.type) {
    case multilinkAction.SET_MULTILINK:
    case multilinkAction.SET_ALL_MULTILINKS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
// actions
// public multilink
export const setMultilink = (multilink: TMultilink) =>
  ({
    type: multilinkAction.SET_MULTILINK,
    payload: { multilink },
  } as const);

export const setAllMultilinks = (allMultilinks: TMultilink[]) =>
  ({
    type: multilinkAction.SET_ALL_MULTILINKS,
    payload: { allMultilinks },
  } as const);

// thunks
export const getMultilink =
  (name: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatus(AppStatus.CONTENT_LOADING));
      const response = await multilinkAPI.get(name);
      if (response.data) {
        batch(() => {
          dispatch(setMultilinkMode(true));
          dispatch(setMultilink(normalizeMLPublic(response.data.multilink)));
          dispatch(setAppStatus(AppStatus.SUCCEEDED));
          dispatch(setInitialized());
        });
      }
      if (!response.data) {
        dispatch(requestMe());
      }
    } catch (e) {
      handleServerNetworkError(e, AppStatus.CONTENT_FAILED, dispatch);
      dispatch(requestMe());
    }
  };

export const getAllMultilinks = (): AppThunk => async dispatch => {
  try {
    dispatch(setAppStatus(AppStatus.CONTENT_LOADING));
    const response = await multilinkAPI.getAll();
    if (response.data) {
      batch(() => {
        dispatch(
          setAllMultilinks(response.data.multilinks.map((ml: TMultilink) => normalizeMLPublic(ml))),
        );
        dispatch(setAppStatus(AppStatus.SUCCEEDED));
      });
    }
  } catch (e) {
    handleServerNetworkError(e, AppStatus.CONTENT_FAILED, dispatch);
  }
};

// types
export type TMultilinkState = {
  multilink: Nullable<TMultilink>;
  allMultilinks: Nullable<TMultilink[]>;
};

export type TMultilinkActions =
  | ReturnType<typeof setMultilink>
  | ReturnType<typeof setAllMultilinks>;

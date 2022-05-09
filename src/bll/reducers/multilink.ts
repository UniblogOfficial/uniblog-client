import axios from 'axios';
import { batch } from 'react-redux';

import { AppStatus } from '../../common/constants';
import { Nullable, TMultilink, TMultilinkDraft } from '../../common/types/instance';
import { TMLDraftContent, TMultilinkComplete } from '../../common/types/instance/multilink';
import { TCreateMLDto } from '../../common/types/request/multilink.dto';
import { handleServerNetworkError } from '../../common/utils/state/errorHandler';
import { multilinkAPI } from '../../dal';
import { AppThunk } from '../store';

import { setAppStatus, setInitialized, setMultilinkMode } from './app';
import { requestMe } from './auth';

enum multilinkAction {
  SET_MULTILINK = 'SET_MULTILINK',
}

const initialState = {
  multilink: null,
  multilinkDraft: null,
};

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
export const setMultilink = (multilink: TMultilink) =>
  ({
    type: multilinkAction.SET_MULTILINK,
    payload: { multilink },
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
          dispatch(setMultilink(response.data));
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

export const publishMultilink =
  (multilink: TMultilinkComplete): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus(AppStatus.USERDATA_LOADING));
    const multilinkDto: TCreateMLDto = {
      name: multilink.name,
      background: multilink.background,
      template: multilink.template,
      content: multilink.contentSet.map(content => {
        const { img, link, linkType, order, text, title, type } = content;
        return {
          order,
          type,
          link: link ?? undefined,
          linkType: linkType ?? undefined,
          title: title ?? undefined,
          text: text ?? undefined,
        };
      }),
    };
    const images = multilink.contentSet
      .filter(content => content.img)
      .map(content => ({ order: content.order + 1, file: content.img?.file! }));
    const response = await multilinkAPI.create(multilinkDto, images);
  };

// types
export type TMultilinkState = {
  multilink: Nullable<TMultilink>;
  multilinkDraft: Nullable<TMultilinkDraft>;
};
export type TMultilinkActions = ReturnType<typeof setMultilink>;

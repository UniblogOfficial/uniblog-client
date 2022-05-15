import axios from 'axios';
import { batch } from 'react-redux';

import { AppStatus, MLContentType } from '../../common/constants';
import { Nullable, TMultilink, TMultilinkDraft } from '../../common/types/instance';
import { TMLDraftContent, TMultilinkComplete } from '../../common/types/instance/multilink';
import { TAvatar } from '../../common/types/instance/user';
import { TCreateMLDto } from '../../common/types/request/multilink.dto';
import { handleServerNetworkError } from '../../common/utils/state/errorHandler';
import { multilinkAPI } from '../../dal';
import { AppThunk } from '../store';

import { setAppStatus, setInitialized, setMultilinkMode } from './app';
import { requestMe } from './auth';

enum multilinkAction {
  SET_MULTILINK = 'SET_MULTILINK',
  SET_MULTILINK_DRAFT_NAME = 'SET_MULTILINK_DRAFT_NAME',
  SET_MULTILINK_DRAFT_LOGO_FROM_USER_AVATAR = 'SET_MULTILINK_DRAFT_LOGO_FROM_USER_AVATAR',
  SET_MULTILINK_DRAFT_TEMPLATE = 'SET_MULTILINK_DRAFT_TEMPLATE',
  SET_MULTILINK_DRAFT_BACKGROUND = 'SET_MULTILINK_DRAFT_BACKGROUND',
  SET_MULTILINK_DRAFT_CONTENT = 'SET_MULTILINK_DRAFT_CONTENT',
}

const initialState = {
  multilink: null,
  multilinkDraft: {
    name: '',
    avatar: null,
    logo: null,
    template: null,
    background: undefined,
    contentSet: [],
  },
  allMultilinks: null,
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
    case multilinkAction.SET_MULTILINK_DRAFT_NAME:
    case multilinkAction.SET_MULTILINK_DRAFT_LOGO_FROM_USER_AVATAR:
    case multilinkAction.SET_MULTILINK_DRAFT_BACKGROUND:
      return {
        ...state,
        multilinkDraft: { ...state.multilinkDraft, ...action.payload },
      };
    case multilinkAction.SET_MULTILINK_DRAFT_TEMPLATE:
      const contentSet: TMLDraftContent[] = action.payload.template.map((block, i) => {
        const isLink = block <= 15;
        const isText = block > 15 && block < 40;
        const isImage = block >= 40;
        const initial = {
          order: i,
          type: null,
          isFilled: false,
          link: null,
          linkType: null,
          title: null,
          text: null,
          img: null,
        };
        switch (true) {
          case isLink:
            return { ...initial, type: MLContentType.LINK };
          case isText:
            return { ...initial, type: MLContentType.TEXT };
          case isImage:
            return { ...initial, type: MLContentType.IMAGE };
          default:
            return { ...initial, type: MLContentType.UNKNOWN };
        }
      });
      return {
        ...state,
        multilinkDraft: { ...state.multilinkDraft, ...action.payload, contentSet },
      };
    case multilinkAction.SET_MULTILINK_DRAFT_CONTENT:
      return {
        ...state,
        multilinkDraft: {
          ...state.multilinkDraft,
          contentSet: state.multilinkDraft.contentSet.map((content, i) =>
            action.payload.order === i ? { ...action.payload } : content,
          ),
        },
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

export const setMLDraftName = (name: string) =>
  ({
    type: multilinkAction.SET_MULTILINK_DRAFT_NAME,
    payload: { name },
  } as const);

export const setMLDraftLogoFromUserAvatar = (avatar: Nullable<TAvatar>) =>
  ({
    type: multilinkAction.SET_MULTILINK_DRAFT_LOGO_FROM_USER_AVATAR,
    payload: { avatar },
  } as const);

export const setMLDraftTemplate = (template: number[]) =>
  ({
    type: multilinkAction.SET_MULTILINK_DRAFT_TEMPLATE,
    payload: { template },
  } as const);

export const setMLDraftBackground = (background: string) =>
  ({
    type: multilinkAction.SET_MULTILINK_DRAFT_BACKGROUND,
    payload: { background },
  } as const);

export const setMLDraftContent = (content: TMLDraftContent) =>
  ({
    type: multilinkAction.SET_MULTILINK_DRAFT_CONTENT,
    payload: { ...content },
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
        const { link, linkType, order, text, title, type } = content;
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
      .map(content => ({ order: content.order, file: content.img?.file! }));
    const logo = multilink.logo?.file ?? undefined;
    const response = await multilinkAPI.create(multilinkDto, images, logo);
  };

// types
export type TMultilinkState = {
  multilink: Nullable<TMultilink>;
  multilinkDraft: TMultilinkDraft;
  allMultilinks: Nullable<TMultilink[]>;
};

export type TMultilinkActions =
  | ReturnType<typeof setMultilink>
  | ReturnType<typeof setMLDraftName>
  | ReturnType<typeof setMLDraftLogoFromUserAvatar>
  | ReturnType<typeof setMLDraftTemplate>
  | ReturnType<typeof setMLDraftBackground>
  | ReturnType<typeof setMLDraftContent>;

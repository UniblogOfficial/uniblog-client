import { batch } from 'react-redux';

import { AppStatus, MLContentType, SocialNetwork } from '../../common/constants';
import {
  IMLDraftContentImage,
  IMLDraftContentImageText,
  IMLDraftContentLink,
  IMLDraftContentLogo,
  IMLDraftContentShop,
  IMLDraftContentSocial,
  IMLDraftContentText,
  IMLDraftContentUnknown,
  IMLDraftContentVideo,
  Nullable,
  TIncomingImage,
  TMultilink,
  TMultilinkComplete,
  TMultilinkDraft,
} from '../../common/types/instance';
import { TImageFile } from '../../common/types/instance/image';
import { TCreateMLDto } from '../../common/types/request/multilink.dto';
import {
  pushMLDraftBlock,
  pushMLDraftBlockLogo,
  pushMLDraftBlockSocial,
} from '../../common/utils/state';
import { handleServerNetworkError } from '../../common/utils/state/errorHandler';
import { multilinkAPI } from '../../dal';
import { getTemplates } from '../../ui/pages/main/multilink/editor/template/templates';
import { AppThunk } from '../store';

enum mlDraftAction {
  SET_MULTILINK_DRAFT_NAME = 'SET_MULTILINK_DRAFT_NAME',
  SET_MULTILINK_DRAFT_LOGO_FROM_USER_AVATAR = 'SET_MULTILINK_DRAFT_LOGO_FROM_USER_AVATAR',
  SET_MULTILINK_DRAFT_TEMPLATE = 'SET_MULTILINK_DRAFT_TEMPLATE',
  SET_MULTILINK_DRAFT_BACKGROUND = 'SET_MULTILINK_DRAFT_BACKGROUND',
  PUSH_MULTILINK_DRAFT_BLOCK = 'PUSH_MULTILINK_DRAFT_BLOCK',
  PUSH_MULTILINK_DRAFT_BLOCK_LOGO = 'PUSH_MULTILINK_DRAFT_BLOCK_LOGO',
  PUSH_MULTILINK_DRAFT_BLOCK_SOCIAL = 'PUSH_MULTILINK_DRAFT_BLOCK_SOCIAL',
  SET_MULTILINK_DRAFT_TEXT_BLOCK_CONTENT = 'SET_MULTILINK_DRAFT_TEXT_BLOCK_CONTENT',
  SET_MULTILINK_DRAFT_LOGO_BLOCK_CONTENT = 'SET_MULTILINK_DRAFT_LOGO_BLOCK_CONTENT',
  SET_MULTILINK_DRAFT_LINK_BLOCK_CONTENT = 'SET_MULTILINK_DRAFT_LINK_BLOCK_CONTENT',
  SET_MULTILINK_DRAFT_SOCIAL_BLOCK_CONTENT = 'SET_MULTILINK_DRAFT_SOCIAL_BLOCK_CONTENT',
  SET_MULTILINK_DRAFT_IMAGE_BLOCK_CONTENT = 'SET_MULTILINK_DRAFT_IMAGE_BLOCK_CONTENT',
  SET_MULTILINK_DRAFT_IMAGETEXT_BLOCK_CONTENT = 'SET_MULTILINK_DRAFT_IMAGETEXT_BLOCK_CONTENT',
  SET_MULTILINK_DRAFT_SHOP_BLOCK_CONTENT = 'SET_MULTILINK_DRAFT_SHOP_BLOCK_CONTENT',
  DELETE_MULTILINK_DRAFT_BLOCK = 'DELETE_MULTILINK_DRAFT_BLOCK',
}

const initialState = {
  name: '',
  background: undefined,
  contentSet: [],
  blocks: {
    textSet: [],
    linkSet: [],
    socialSet: [],
    logoSet: [],
    imageSet: [],
    imageTextSet: [],
    videoSet: [],
    shopSet: [],
    unknownSet: [],
  },
};

export const mlDraftReducer = (
  state: TMLDraftState = initialState,
  action: TMLDraftActions,
): TMLDraftState => {
  switch (action.type) {
    case mlDraftAction.SET_MULTILINK_DRAFT_NAME:
    case mlDraftAction.SET_MULTILINK_DRAFT_BACKGROUND:
      return {
        ...state,
        ...action.payload,
      };

    case mlDraftAction.SET_MULTILINK_DRAFT_TEMPLATE:
      const { template } = action.payload;
      return {
        ...state,
        contentSet: template.map(block => block.type),
        blocks: {
          textSet: template.map(block => (block.type === MLContentType.TEXT ? block : null)),
          linkSet: template.map(block => (block.type === MLContentType.LINK ? block : null)),
          socialSet: template.map(block => (block.type === MLContentType.SOCIAL ? block : null)),
          logoSet: template.map(block => (block.type === MLContentType.LOGO ? block : null)),
          imageSet: template.map(block => (block.type === MLContentType.IMAGE ? block : null)),
          imageTextSet: template.map(block =>
            block.type === MLContentType.IMAGETEXT ? block : null,
          ),
          videoSet: template.map(block => (block.type === MLContentType.VIDEO ? block : null)),
          shopSet: template.map(block => (block.type === MLContentType.SHOP ? block : null)),
          unknownSet: template.map(block => null),
        },
      };

    case mlDraftAction.PUSH_MULTILINK_DRAFT_BLOCK:
      let newBlocks = pushMLDraftBlock(action.payload.type, state.blocks, state.contentSet.length);
      return {
        ...state,
        contentSet: [...state.contentSet, action.payload.type],
        blocks: newBlocks,
      };

    case mlDraftAction.PUSH_MULTILINK_DRAFT_BLOCK_LOGO:
      newBlocks = pushMLDraftBlockLogo(state.blocks, state.contentSet.length, action.payload.logo);
      return {
        ...state,
        contentSet: [...state.contentSet, MLContentType.LOGO],
        blocks: newBlocks,
      };

    case mlDraftAction.PUSH_MULTILINK_DRAFT_BLOCK_SOCIAL:
      newBlocks = pushMLDraftBlockSocial(
        state.blocks,
        state.contentSet.length,
        action.payload.socials,
      );
      return {
        ...state,
        contentSet: [...state.contentSet, MLContentType.SOCIAL],
        blocks: newBlocks,
      };

    case mlDraftAction.SET_MULTILINK_DRAFT_TEXT_BLOCK_CONTENT:
      return {
        ...state,
        blocks: {
          ...state.blocks,
          textSet: state.blocks.textSet.map((block, i) =>
            i === action.payload.order ? action.payload.content : block,
          ),
        },
      };
    default:
      return state;
  }
};
// actions
export const setMLDraftName = (name: string) =>
  ({
    type: mlDraftAction.SET_MULTILINK_DRAFT_NAME,
    payload: { name },
  } as const);

export const setMLDraftTemplate = (templates: ReturnType<typeof getTemplates>, index: number) =>
  ({
    type: mlDraftAction.SET_MULTILINK_DRAFT_TEMPLATE,
    payload: { template: templates[index] },
  } as const);

export const setMLDraftLogoFromUserAvatar = (avatar: Nullable<TIncomingImage>) =>
  ({
    type: mlDraftAction.SET_MULTILINK_DRAFT_LOGO_FROM_USER_AVATAR,
    payload: { avatar },
  } as const);

export const setMLDraftBackground = (background: string | TImageFile) =>
  ({
    type: mlDraftAction.SET_MULTILINK_DRAFT_BACKGROUND,
    payload: { background },
  } as const);

export const addMLDraftBlock = (type: MLContentType) =>
  ({
    type: mlDraftAction.PUSH_MULTILINK_DRAFT_BLOCK,
    payload: { type },
  } as const);

export const addMLDraftBlockLogo = (logo: Nullable<TIncomingImage>) =>
  ({
    type: mlDraftAction.PUSH_MULTILINK_DRAFT_BLOCK_LOGO,
    payload: { logo },
  } as const);

export const addMLDraftBlockSocial = (socials: { type: SocialNetwork; href: string }[]) =>
  ({
    type: mlDraftAction.PUSH_MULTILINK_DRAFT_BLOCK_SOCIAL,
    payload: { socials },
  } as const);

export const setMLDraftTextBlockContent = (content: IMLDraftContentText, order: number) =>
  ({
    type: mlDraftAction.SET_MULTILINK_DRAFT_TEXT_BLOCK_CONTENT,
    payload: { content, order },
  } as const);

export const setMLDraftShopBlockContent = (content: IMLDraftContentShop, order: number) =>
  ({
    type: mlDraftAction.SET_MULTILINK_DRAFT_SHOP_BLOCK_CONTENT,
    payload: { content, order },
  } as const);

// thunks
export const publishMultilink =
  (multilink: TMultilinkComplete): AppThunk =>
  async dispatch => {
    /* dispatch(setAppStatus(AppStatus.USERDATA_LOADING));
    const multilinkDto: TCreateMLDto = {
      name: multilink.name,
      background: multilink.background,
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
    const response = await multilinkAPI.create(multilinkDto, images, logo); */
  };

// types
export type TMLDraftState = {
  name: string;
  background: undefined | string | TImageFile;
  contentSet: MLContentType[];
  blocks: {
    textSet: Nullable<IMLDraftContentText>[];
    linkSet: Nullable<IMLDraftContentLink>[];
    socialSet: Nullable<IMLDraftContentSocial>[];
    logoSet: Nullable<IMLDraftContentLogo>[];
    imageSet: Nullable<IMLDraftContentImage>[];
    imageTextSet: Nullable<IMLDraftContentImageText>[];
    videoSet: Nullable<IMLDraftContentVideo>[];
    shopSet: Nullable<IMLDraftContentShop>[];
    unknownSet: Nullable<IMLDraftContentUnknown>[];
  };
};

export type TMLDraftActions =
  | ReturnType<typeof setMLDraftName>
  | ReturnType<typeof setMLDraftLogoFromUserAvatar>
  | ReturnType<typeof setMLDraftTemplate>
  | ReturnType<typeof setMLDraftBackground>
  | ReturnType<typeof addMLDraftBlock>
  | ReturnType<typeof addMLDraftBlockLogo>
  | ReturnType<typeof addMLDraftBlockSocial>
  | ReturnType<typeof setMLDraftTextBlockContent>
  | ReturnType<typeof setMLDraftShopBlockContent>;

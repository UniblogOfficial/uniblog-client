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
  TMLDraftBlocks,
  TMLDraftImages,
  TMLImageContentImage,
  TMLImageContentImageText,
  TMLImageContentLogo,
  TMLImageContentShop,
  TMultilink,
  TMultilinkComplete,
  TMultilinkDraft,
} from '../../common/types/instance';
import { TImageFile } from '../../common/types/instance/image';
import { TCreateMLDto, TCreateMLImagesDto } from '../../common/types/request/multilink.dto';
import {
  pushMLDraftBlock,
  pushMLDraftBlockLogo,
  pushMLDraftBlockSocial,
  notNull,
} from '../../common/utils/state';
import { handleServerNetworkError } from '../../common/utils/state/errorHandler';
import { multilinkAPI } from '../../dal';
import { getTemplates } from '../../ui/pages/main/multilink/editor/template/templates';
import { AppThunk } from '../store';

import { setAppStatus } from '.';

enum mlDraftAction {
  SET_MULTILINK_DRAFT_NAME = 'SET_MULTILINK_DRAFT_NAME',
  SET_MULTILINK_DRAFT_LOGO_FROM_USER_AVATAR = 'SET_MULTILINK_DRAFT_LOGO_FROM_USER_AVATAR',
  SET_MULTILINK_DRAFT_TEMPLATE = 'SET_MULTILINK_DRAFT_TEMPLATE',
  SET_MULTILINK_DRAFT_BACKGROUND = 'SET_MULTILINK_DRAFT_BACKGROUND',
  SET_MULTILINK_DRAFT_BACKGROUND_IMAGE = 'SET_MULTILINK_DRAFT_BACKGROUND_IMAGE',
  PUSH_MULTILINK_DRAFT_BLOCK = 'PUSH_MULTILINK_DRAFT_BLOCK',
  PUSH_MULTILINK_DRAFT_BLOCK_LOGO = 'PUSH_MULTILINK_DRAFT_BLOCK_LOGO',
  PUSH_MULTILINK_DRAFT_BLOCK_SOCIAL = 'PUSH_MULTILINK_DRAFT_BLOCK_SOCIAL',
  SET_MULTILINK_DRAFT_BLOCK_CONTENT = 'SET_MULTILINK_DRAFT_BLOCK_CONTENT',
  SET_MULTILINK_DRAFT_BLOCK_CONTENT_IMAGE = 'SET_MULTILINK_DRAFT_BLOCK_CONTENT_IMAGE',
  DELETE_MULTILINK_DRAFT_BLOCK = 'DELETE_MULTILINK_DRAFT_BLOCK',
}

const initialState = {
  name: '',
  background: '#fff',
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
  images: {
    background: null,
    blocks: {
      logoSet: [],
      imageSet: [],
      imageTextSet: [],
      shopSet: [],
    },
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

    case mlDraftAction.SET_MULTILINK_DRAFT_BACKGROUND_IMAGE:
      return {
        ...state,
        images: {
          ...state.images,
          background: action.payload.background,
        },
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
        images: {
          background: null,
          blocks: {
            logoSet: template.map((block, i) =>
              block.type === MLContentType.LOGO ? { order: i, logo: null } : null,
            ),
            imageSet: template.map((block, i) =>
              block.type === MLContentType.IMAGE ? { order: i, images: [null] } : null,
            ),
            imageTextSet: template.map((block, i) =>
              block.type === MLContentType.IMAGETEXT ? { order: i, image: null } : null,
            ),
            shopSet: template.map((block, i) =>
              block.type === MLContentType.SHOP
                ? { order: i, cells: block.cells.map(() => null) }
                : null,
            ),
          },
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

    case mlDraftAction.SET_MULTILINK_DRAFT_BLOCK_CONTENT:
      return {
        ...state,
        blocks: {
          ...state.blocks,
          ...{
            [`${action.payload.field}`]: state.blocks[action.payload.field].map((block, i) =>
              i === action.payload.order ? action.payload.content : block,
            ),
          },
        },
      };

    case mlDraftAction.SET_MULTILINK_DRAFT_BLOCK_CONTENT_IMAGE:
      return {
        ...state,
        images: {
          ...state.images,
          blocks: {
            ...state.images.blocks,
            ...{
              [`${action.payload.field}`]: state.images.blocks[action.payload.field].map(
                (block, i) => (i === action.payload.order ? action.payload.images : block),
              ),
            },
          },
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

export const setMLDraftBackground = (background: string) =>
  ({
    type: mlDraftAction.SET_MULTILINK_DRAFT_BACKGROUND,
    payload: { background },
  } as const);

export const setMLDraftBackgroundImage = (background: TImageFile) =>
  ({
    type: mlDraftAction.SET_MULTILINK_DRAFT_BACKGROUND_IMAGE,
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

export const setMLDraftBlockContent = <T>(content: T, order: number, field: keyof TMLDraftBlocks) =>
  ({
    type: mlDraftAction.SET_MULTILINK_DRAFT_BLOCK_CONTENT,
    payload: { content, order, field },
  } as const);

export const setMLDraftBlockContentImage = <T>(
  images: T,
  order: number,
  field: keyof Omit<
    TMLDraftBlocks,
    'textSet' | 'linkSet' | 'socialSet' | 'videoSet' | 'unknownSet'
  >,
) =>
  ({
    type: mlDraftAction.SET_MULTILINK_DRAFT_BLOCK_CONTENT_IMAGE,
    payload: { images, order, field },
  } as const);

// thunks
export const publishMultilink =
  (multilink: TMultilinkDraft): AppThunk =>
  async dispatch => {
    dispatch(setAppStatus(AppStatus.USERDATA_LOADING));
    const { name, background, contentSet, blocks, images } = multilink;
    const multilinkDto: TCreateMLDto = {
      name,
      background,
      contentSet,
      textSet: blocks.textSet.filter(notNull),
      linkSet: blocks.linkSet.filter(notNull),
      socialSet: blocks.socialSet.filter(notNull),
      logoSet: blocks.logoSet.filter(notNull).map(block => ({ ...block, logo: null })),
      imageSet: blocks.imageSet.filter(notNull),
      imageTextSet: blocks.imageTextSet.filter(notNull),
      videoSet: blocks.videoSet.filter(notNull),
      shopSet: blocks.shopSet.filter(notNull),
    };
    const imagesDto: TCreateMLImagesDto = {
      background: images.background ?? undefined,
      logoSet: images.blocks.logoSet.filter(notNull),
      imageSet: images.blocks.imageSet.filter(notNull),
      imageTextSet: images.blocks.imageTextSet.filter(notNull),
      shopSet: images.blocks.shopSet.filter(notNull),
    };
    const response = await multilinkAPI.create(multilinkDto, imagesDto);
  };

// types
export type TMLDraftState = {
  name: string;
  background: string;
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
  images: {
    background: Nullable<TImageFile>;
    blocks: {
      logoSet: Nullable<TMLImageContentLogo<TImageFile>>[];
      imageSet: Nullable<TMLImageContentImage<TImageFile>>[];
      imageTextSet: Nullable<TMLImageContentImageText<TImageFile>>[];
      shopSet: Nullable<TMLImageContentShop<TImageFile>>[];
    };
  };
};

export type TMLDraftActions =
  | ReturnType<typeof setMLDraftName>
  | ReturnType<typeof setMLDraftLogoFromUserAvatar>
  | ReturnType<typeof setMLDraftTemplate>
  | ReturnType<typeof setMLDraftBackground>
  | ReturnType<typeof setMLDraftBackgroundImage>
  | ReturnType<typeof addMLDraftBlock>
  | ReturnType<typeof addMLDraftBlockLogo>
  | ReturnType<typeof addMLDraftBlockSocial>
  | ReturnType<typeof setMLDraftBlockContent>
  | ReturnType<typeof setMLDraftBlockContentImage>;

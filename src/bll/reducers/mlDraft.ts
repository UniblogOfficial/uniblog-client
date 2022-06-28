import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { TMLDraftBlocksUnion } from '../../common/types/instance/mlDraft';

import { setAppStatus } from '.';

import {
  AppStatus,
  MLConstructorStage,
  MLContentType,
  SocialNetwork,
  SocialService,
} from 'common/constants';
import {
  Nullable,
  TIncomingImage,
  TImageFile,
  TMLDraftBlocks,
  TMLDraftImages,
  TMultilinkDraft,
  IMLDraftLink,
} from 'common/types/instance';
import { MLDraftText } from 'common/types/instance/mlDraft';
import { IMLDraftContent } from 'common/types/instance/mlDraft/abstract/mlBlock.class';
import { TCreateMLDto, TCreateMLImagesDto } from 'common/types/request/multilink.dto';
import {
  pushMLDraftBlock,
  pushMLDraftBlockLogo,
  pushMLDraftBlockSocial,
  notNull,
} from 'common/utils/state';
import { authAPI, multilinkAPI } from 'dal';
import { getTemplates } from 'ui/pages/main/multilink/editor/template/templates';

const initialState: TMLDraftState = {
  name: '',
  background: '#fff',
  maxWidth: 480,
  contentMap: [],
  blocks: {},

  images: {
    background: null,
    blocks: {
      logoBlocks: [],
      imageBlocks: [],
      imageTextBlocks: [],
      shopBlocks: [],
      buttonBlocks: [],
      carouselBlocks: [],
      linkBlocks: [],
    },
  },

  // in-app values
  currentStage: MLConstructorStage.TEMPLATE,
};

const mlDraftSlice = createSlice({
  name: 'mlDraft',
  initialState,
  reducers: {
    setMLDraftName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },

    setMLDraftTemplate(
      state,
      action: PayloadAction<{ templates: ReturnType<typeof getTemplates>; index: number }>,
    ) {
      const template = action.payload.templates[action.payload.index];
      state.contentMap = template.map((block, i) => {
        const blockId = nanoid();
        state.blocks[`${block.type}_${blockId}`] = template[i];
        return `${block.type}_${blockId}`;
      });
      state.images.background = null;
      state.images.blocks = {
        /* logoBlocks: template.map((block, i) =>
          block.type === MLContentType.LOGO ? { order: i, logo: null } : null,
        ),
        imageBlocks: template.map((block, i) =>
          block.type === MLContentType.IMAGE ? { order: i, images: [null] } : null,
        ),
        imageTextBlocks: template.map((block, i) =>
          block.type === MLContentType.IMAGETEXT ? { order: i, image: null } : null,
        ),
        shopBlocks: template.map((block, i) =>
          block.type === MLContentType.SHOP
            ? { order: i, cells: block.cells.map(() => null) }
            : null,
        ), */
        logoBlocks: template.map((block, i) => null),
        imageBlocks: template.map((block, i) => null),
        imageTextBlocks: template.map((block, i) => null),
        shopBlocks: template.map((block, i) => null),
        buttonBlocks: template.map((block, i) => null),
        carouselBlocks: template.map((block, i) => null),
        linkBlocks: template.map((block, i) => null),
      };
    },

    setMLDraftLogoFromUserAvatar(state, action: PayloadAction<Nullable<TIncomingImage>>) {},

    setMLDraftBackground(state, action: PayloadAction<string>) {
      state.background = action.payload;
    },

    setMLDraftBackgroundImage(state, action: PayloadAction<TImageFile>) {
      state.images = { ...state.images, background: action.payload };
    },

    addMLDraftBlock(state, action: PayloadAction<{ type: MLContentType; id: string }>) {
      pushMLDraftBlock(action.payload.type, state.blocks, action.payload.id);
      state.contentMap = [...state.contentMap, `${action.payload.type}_${action.payload.id}`];
    },

    addMLDraftBlockLogo(state, action: PayloadAction<Nullable<TIncomingImage>>) {
      const newBlocks = pushMLDraftBlockLogo(state.blocks, state.contentMap.length, action.payload);
      state.contentMap = [...state.contentMap, MLContentType.LOGO];
      state.blocks = newBlocks;
    },

    addMLDraftBlockSocial(
      state,
      action: PayloadAction<{ socials: { type: SocialNetwork; href: string }[] }>,
    ) {
      const newBlocks = pushMLDraftBlockSocial(
        state.blocks,
        state.contentMap.length,
        action.payload.socials,
      );
      state.contentMap = [...state.contentMap, MLContentType.SOCIAL];
      state.blocks = newBlocks;
    },

    setMLDraftBlockContent<T extends TMLDraftBlocksUnion>(
      state: TMLDraftState,
      action: PayloadAction<{ content: Partial<T>; id: string; type: MLContentType }>,
    ) {
      const { id, type, content } = action.payload;
      const block = state.blocks[`${type}_${id}`];
      Object.assign(block, content);
      state.blocks = { ...state.blocks };
    },
    setMLDraftBlockContentImage<T>(
      state: TMLDraftState,
      action: PayloadAction<{
        imageData: T;
        id: string;
        field: keyof Pick<
          TMLDraftBlocks,
          | 'logoBlocks'
          | 'imageBlocks'
          | 'imageTextBlocks'
          | 'shopBlocks'
          | 'carouselBlocks'
          | 'buttonBlocks'
          | 'linkBlocks'
        >;
      }>,
    ) {
      const { imageData, id, field } = action.payload;
      const order = state.contentMap.findIndex(el => el === `${field}_${id}`);
      // @ts-ignore
      state.images.blocks[field][order] = {
        ...state.images.blocks[field][order],
        ...imageData,
      };
    },
  },
});

export const {
  setMLDraftName,
  setMLDraftTemplate,
  setMLDraftLogoFromUserAvatar,
  setMLDraftBackground,
  setMLDraftBackgroundImage,
  addMLDraftBlock,
  addMLDraftBlockLogo,
  addMLDraftBlockSocial,
  setMLDraftBlockContent,
  setMLDraftBlockContentImage,
} = mlDraftSlice.actions;
export const mlDraftReducer = mlDraftSlice.reducer;

// thunks

export const publishMultilink = createAsyncThunk(
  'mlDraft/publishMultilink',
  async (multilink: TMultilinkDraft, { dispatch, rejectWithValue, getState }) => {
    /* dispatch(setAppStatus(AppStatus.USERDATA_LOADING));
    const { name, background, contentMap, blocks, images } = multilink;
    const multilinkDto: TCreateMLDto = {
      name,
      background,
      maxWidth: 480,
      contentMap,
      textBlocks: blocks.textBlocks.filter(notNull),
      socialBlocks: blocks.socialBlocks.filter(notNull),
      videoBlocks: blocks.videoBlocks.filter(notNull),
      audioBlocks: blocks.audioBlocks.filter(notNull),
      dividerBlocks: blocks.dividerBlocks.filter(notNull),
      mapBlocks: blocks.mapBlocks.filter(notNull),
      postBlocks: blocks.postBlocks.filter(notNull),
      voteBlocks: blocks.voteBlocks.filter(notNull),
      widgetBlocks: blocks.widgetBlocks.filter(notNull),

      logoBlocks: blocks.logoBlocks.filter(notNull).map(block => ({ ...block, logo: null })),
      linkBlocks: blocks.linkBlocks.filter(notNull),
      imageBlocks: blocks.imageBlocks.filter(notNull),
      imageTextBlocks: blocks.imageTextBlocks.filter(notNull),
      shopBlocks: blocks.shopBlocks.filter(notNull),
      carouselBlocks: blocks.carouselBlocks.filter(notNull),
      buttonBlocks: blocks.buttonBlocks.filter(notNull),
    };
    const imagesDto: TCreateMLImagesDto = {
      background: images.background ?? undefined,

      logoBlocks: images.blocks.logoBlocks.filter(notNull),
      imageBlocks: images.blocks.imageBlocks.filter(notNull),
      imageTextBlocks: images.blocks.imageTextBlocks.filter(notNull),
      shopBlocks: images.blocks.shopBlocks.filter(notNull),
      buttonBlocks: images.blocks.buttonBlocks.filter(notNull),
      carouselBlocks: images.blocks.carouselBlocks.filter(notNull),
      linkBlocks: images.blocks.linkBlocks.filter(notNull),
    };
    const response = await multilinkAPI.create(multilinkDto, imagesDto); */
  },
);

// types
export type TMLDraftState = {
  name: string;
  background: string;
  maxWidth: number;
  contentMap: string[];
  blocks: TMLDraftBlocks;
  images: TMLDraftImages;
  // in-app values
  currentStage: MLConstructorStage;
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

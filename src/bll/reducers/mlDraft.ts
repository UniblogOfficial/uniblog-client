import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
import { IMLDraftContent } from 'common/types/instance/mlDraft';
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
  blocks: {
    textBlocks: [],
    linkBlocks: [],
    socialBlocks: [],
    logoBlocks: [],
    imageBlocks: [],
    imageTextBlocks: [],
    videoBlocks: [],
    shopBlocks: [],
    audioBlocks: [],
    buttonBlocks: [],
    carouselBlocks: [],
    dividerBlocks: [],
    mapBlocks: [],
    postBlocks: [],
    voteBlocks: [],
    widgetBlocks: [],
  },

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
      state.contentMap = template.map(block => block.type);
      state.blocks = {
        textBlocks: template.map(block => (block.type === MLContentType.TEXT ? block : null)),
        linkBlocks: template.map(block => (block.type === MLContentType.LINK ? block : null)),
        socialBlocks: template.map(block => (block.type === MLContentType.SOCIAL ? block : null)),
        logoBlocks: template.map(block => (block.type === MLContentType.LOGO ? block : null)),
        imageBlocks: template.map(block => (block.type === MLContentType.IMAGE ? block : null)),
        imageTextBlocks: template.map(block =>
          block.type === MLContentType.IMAGETEXT ? block : null,
        ),
        videoBlocks: template.map(block => (block.type === MLContentType.VIDEO ? block : null)),
        shopBlocks: template.map(block => (block.type === MLContentType.SHOP ? block : null)),
        // audioBlocks: template.map(block => (block.type === MLContentType.AUDIO ? block : null)),
        audioBlocks: template.map(block => null),
        buttonBlocks: template.map(block => null),
        carouselBlocks: template.map(block => null),
        dividerBlocks: template.map(block => null),
        mapBlocks: template.map(block => null),
        postBlocks: template.map(block => null),
        voteBlocks: template.map(block => null),
        widgetBlocks: template.map(block => (block.type === MLContentType.WIDGET ? block : null)),
      };
      state.images.background = null;
      state.images.blocks = {
        logoBlocks: template.map((block, i) =>
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
        ),
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
    addMLDraftBlock(state, action: PayloadAction<MLContentType>) {
      const newBlocks = pushMLDraftBlock(action.payload, state.blocks, state.contentMap.length);
      state.contentMap = [...state.contentMap, action.payload];
      state.blocks = newBlocks;
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
    setMLDraftBlockContent<T extends IMLDraftContent<any>>(
      state: TMLDraftState,
      action: PayloadAction<{ content: T; order: number }>,
    ) {
      const field = action.payload.content.type as unknown as keyof TMLDraftBlocks;
      state.blocks[field][action.payload.content.order] = action.payload.content;
    },
    setMLDraftBlockContentImage<T extends Omit<IMLDraftContent<any>, 'type' | 'isFilled'>>(
      state: TMLDraftState,
      action: PayloadAction<{
        images: T;
        order: number;
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
      // @ts-ignore
      state.blocks[action.payload.field][action.payload.images.order] = action.payload.images;
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
    dispatch(setAppStatus(AppStatus.USERDATA_LOADING));
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
    const response = await multilinkAPI.create(multilinkDto, imagesDto);
  },
);

// types
export type TMLDraftState = {
  name: string;
  background: string;
  maxWidth: number;
  contentMap: MLContentType[];
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

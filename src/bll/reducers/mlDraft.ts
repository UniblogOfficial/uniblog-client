import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setAppStatus } from '.';

import { AppThunk, store } from 'bll/store';
import { AppStatus, MLConstructorStage, MLContentType, SocialNetwork } from 'common/constants';
import {
  Nullable,
  TIncomingImage,
  TImageFile,
  TMLDraftBlocks,
  TMLDraftImages,
  TMultilinkDraft,
} from 'common/types/instance';
import { IMLDraftContent } from 'common/types/instance/mlDraft';
import { TLoginDto } from 'common/types/request';
import { TCreateMLDto, TCreateMLImagesDto } from 'common/types/request/multilink.dto';
import {
  pushMLDraftBlock,
  pushMLDraftBlockLogo,
  pushMLDraftBlockSocial,
  notNull,
  handleServerNetworkError,
} from 'common/utils/state';
import { authAPI, multilinkAPI } from 'dal';
import { getTemplates } from 'ui/pages/main/multilink/editor/template/templates';

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

// export const mlDraftReducer = (
//   state: TMLDraftState = initialState,
//   action: TMLDraftActions,
// ): TMLDraftState => {
//   switch (action.type) {
//     case mlDraftAction.SET_MULTILINK_DRAFT_NAME:
//     case mlDraftAction.SET_MULTILINK_DRAFT_BACKGROUND:
//       return {
//         ...state,
//         ...action.payload,
//       };
//
//     case mlDraftAction.SET_MULTILINK_DRAFT_BACKGROUND_IMAGE:
//       return {
//         ...state,
//         images: {
//           ...state.images,
//           background: action.payload.background,
//         },
//       };

//     case mlDraftAction.SET_MULTILINK_DRAFT_TEMPLATE:
//       const { template } = action.payload;
//       return {
//         ...state,
//         contentMap: template.map(block => block.type),
//         blocks: {
//           textBlocks: template.map(block => (block.type === MLContentType.TEXT ? block : null)),
//           linkBlocks: template.map(block => (block.type === MLContentType.LINK ? block : null)),
//           socialBlocks: template.map(block => (block.type === MLContentType.SOCIAL ? block : null)),
//           logoBlocks: template.map(block => (block.type === MLContentType.LOGO ? block : null)),
//           imageBlocks: template.map(block => (block.type === MLContentType.IMAGE ? block : null)),
//           imageTextBlocks: template.map(block =>
//             block.type === MLContentType.IMAGETEXT ? block : null,
//           ),
//           videoBlocks: template.map(block => (block.type === MLContentType.VIDEO ? block : null)),
//           shopBlocks: template.map(block => (block.type === MLContentType.SHOP ? block : null)),
//           // audioBlocks: template.map(block => (block.type === MLContentType.AUDIO ? block : null)),
//           audioBlocks: template.map(block => null),
//           buttonBlocks: template.map(block => null),
//           carouselBlocks: template.map(block => null),
//           dividerBlocks: template.map(block => null),
//           mapBlocks: template.map(block => null),
//           postBlocks: template.map(block => null),
//           voteBlocks: template.map(block => null),
//           widgetBlocks: template.map(block => (block.type === MLContentType.WIDGET ? block : null)),
//         },
//         images: {
//           background: null,
//           blocks: {
//             logoBlocks: template.map((block, i) =>
//               block.type === MLContentType.LOGO ? { order: i, logo: null } : null,
//             ),
//             imageBlocks: template.map((block, i) =>
//               block.type === MLContentType.IMAGE ? { order: i, images: [null] } : null,
//             ),
//             imageTextBlocks: template.map((block, i) =>
//               block.type === MLContentType.IMAGETEXT ? { order: i, image: null } : null,
//             ),
//             shopBlocks: template.map((block, i) =>
//               block.type === MLContentType.SHOP
//                 ? { order: i, cells: block.cells.map(() => null) }
//                 : null,
//             ),
//             buttonBlocks: template.map((block, i) => null),
//             carouselBlocks: template.map((block, i) => null),
//             linkBlocks: template.map((block, i) => null),
//           },
//         },
//       };
//
//     case mlDraftAction.PUSH_MULTILINK_DRAFT_BLOCK:
//       let newBlocks = pushMLDraftBlock(action.payload.type, state.blocks, state.contentMap.length);
//       return {
//         ...state,
//         contentMap: [...state.contentMap, action.payload.type],
//         blocks: newBlocks,
//       };
//
//     case mlDraftAction.PUSH_MULTILINK_DRAFT_BLOCK_LOGO:
//       newBlocks = pushMLDraftBlockLogo(state.blocks, state.contentMap.length, action.payload.logo);
//       return {
//         ...state,
//         contentMap: [...state.contentMap, MLContentType.LOGO],
//         blocks: newBlocks,
//       };
//
//     case mlDraftAction.PUSH_MULTILINK_DRAFT_BLOCK_SOCIAL:
//       newBlocks = pushMLDraftBlockSocial(
//         state.blocks,
//         state.contentMap.length,
//         action.payload.socials,
//       );
//       return {
//         ...state,
//         contentMap: [...state.contentMap, MLContentType.SOCIAL],
//         blocks: newBlocks,
//       };
//
//     case mlDraftAction.SET_MULTILINK_DRAFT_BLOCK_CONTENT:
//       return {
//         ...state,
//         blocks: {
//           ...state.blocks,
//           ...{
//             [`${action.payload.field}`]: state.blocks[action.payload.field].map((block, i) =>
//               i === action.payload.order ? action.payload.content : block,
//             ),
//           },
//         },
//       };
//
//     case mlDraftAction.SET_MULTILINK_DRAFT_BLOCK_CONTENT_IMAGE:
//       return {
//         ...state,
//         images: {
//           ...state.images,
//           blocks: {
//             ...state.images.blocks,
//             ...{
//               [`${action.payload.field}`]: state.images.blocks[action.payload.field].map(
//                 (block, i) => (i === action.payload.order ? action.payload.images : block),
//               ),
//             },
//           },
//         },
//       };
//
//     default:
//       return state;
//   }
// };

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
    setMLDraftBlockContentImage<T>(
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
      state.images = {
        ...state.images,
        blocks: {
          ...state.images.blocks,
          ...{
            [`${action.payload.field}`]: state.images.blocks[action.payload.field].map(
              (block: any, i: number) =>
                i === action.payload.order ? action.payload.images : block,
            ),
          },
        },
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
// actions
// export const setMLDraftName = (name: string) =>
//   ({
//     type: mlDraftAction.SET_MULTILINK_DRAFT_NAME,
//     payload: { name },
//   } as const);

// export const setMLDraftTemplate = (templates: ReturnType<typeof getTemplates>, index: number) =>
//   ({
//     type: mlDraftAction.SET_MULTILINK_DRAFT_TEMPLATE,
//     payload: { template: templates[index] },
//   } as const);

// export const setMLDraftLogoFromUserAvatar = (avatar: Nullable<TIncomingImage>) =>
//   ({
//     type: mlDraftAction.SET_MULTILINK_DRAFT_LOGO_FROM_USER_AVATAR,
//     payload: { avatar },
//   } as const);

// export const setMLDraftBackground = (background: string) =>
//   ({
//     type: mlDraftAction.SET_MULTILINK_DRAFT_BACKGROUND,
//     payload: { background },
//   } as const);

// export const setMLDraftBackgroundImage = (background: TImageFile) =>
//   ({
//     type: mlDraftAction.SET_MULTILINK_DRAFT_BACKGROUND_IMAGE,
//     payload: { background },
//   } as const);

// export const addMLDraftBlock = (type: MLContentType) =>
//   ({
//     type: mlDraftAction.PUSH_MULTILINK_DRAFT_BLOCK,
//     payload: { type },
//   } as const);

// export const addMLDraftBlockLogo = (logo: Nullable<TIncomingImage>) =>
//   ({
//     type: mlDraftAction.PUSH_MULTILINK_DRAFT_BLOCK_LOGO,
//     payload: { logo },
//   } as const);

// export const addMLDraftBlockSocial = (socials: { type: SocialNetwork; href: string }[]) =>
//   ({
//     type: mlDraftAction.PUSH_MULTILINK_DRAFT_BLOCK_SOCIAL,
//     payload: { socials },
//   } as const);

// export const setMLDraftBlockContent = <T>(content: T, order: number, field: keyof TMLDraftBlocks) =>
//   ({
//     type: mlDraftAction.SET_MULTILINK_DRAFT_BLOCK_CONTENT,
//     payload: { content, order, field },
//   } as const);

// export const setMLDraftBlockContentImage = <T>(props: {
//   images: T;
//   order: number;
//   field: keyof Pick<
//     TMLDraftBlocks,
//     | 'logoBlocks'
//     | 'imageBlocks'
//     | 'imageTextBlocks'
//     | 'shopBlocks'
//     | 'carouselBlocks'
//     | 'buttonBlocks'
//     | 'linkBlocks'
//   >;
// }) =>
//   ({
//     type: mlDraftAction.SET_MULTILINK_DRAFT_BLOCK_CONTENT_IMAGE,
//     payload: props,
//   } as const);

// thunks
// export const publishMultilink =
//   (multilink: TMultilinkDraft): AppThunk =>
//   async dispatch => {
//     dispatch(setAppStatus(AppStatus.USERDATA_LOADING));
//     const { name, background, contentMap, blocks, images } = multilink;
//     const multilinkDto: TCreateMLDto = {
//       name,
//       background,
//       maxWidth: 480,
//       contentMap,
//       textBlocks: blocks.textBlocks.filter(notNull),
//       socialBlocks: blocks.socialBlocks.filter(notNull),
//       videoBlocks: blocks.videoBlocks.filter(notNull),
//       audioBlocks: blocks.audioBlocks.filter(notNull),
//       dividerBlocks: blocks.dividerBlocks.filter(notNull),
//       mapBlocks: blocks.mapBlocks.filter(notNull),
//       postBlocks: blocks.postBlocks.filter(notNull),
//       voteBlocks: blocks.voteBlocks.filter(notNull),
//       widgetBlocks: blocks.widgetBlocks.filter(notNull),
//
//       logoBlocks: blocks.logoBlocks.filter(notNull).map(block => ({ ...block, logo: null })),
//       linkBlocks: blocks.linkBlocks.filter(notNull),
//       imageBlocks: blocks.imageBlocks.filter(notNull),
//       imageTextBlocks: blocks.imageTextBlocks.filter(notNull),
//       shopBlocks: blocks.shopBlocks.filter(notNull),
//       carouselBlocks: blocks.carouselBlocks.filter(notNull),
//       buttonBlocks: blocks.buttonBlocks.filter(notNull),
//     };
//     const imagesDto: TCreateMLImagesDto = {
//       background: images.background ?? undefined,
//
//       logoBlocks: images.blocks.logoBlocks.filter(notNull),
//       imageBlocks: images.blocks.imageBlocks.filter(notNull),
//       imageTextBlocks: images.blocks.imageTextBlocks.filter(notNull),
//       shopBlocks: images.blocks.shopBlocks.filter(notNull),
//       buttonBlocks: images.blocks.buttonBlocks.filter(notNull),
//       carouselBlocks: images.blocks.carouselBlocks.filter(notNull),
//       linkBlocks: images.blocks.linkBlocks.filter(notNull),
//     };
//     const response = await multilinkAPI.create(multilinkDto, imagesDto);
//   };

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

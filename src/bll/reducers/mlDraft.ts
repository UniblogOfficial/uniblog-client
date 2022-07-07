import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MLBackgroundType } from '../../common/constants/index';
import { imageAPI } from '../../dal/image';

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
import { TMLDraftBlocksUnion, MLDraftText } from 'common/types/instance/mlDraft';
import { IMLDraftContent } from 'common/types/instance/mlDraft/abstract/mlBlock.class';
import { TCreateMLDto, TCreateMLImagesDto } from 'common/types/request/multilink.dto';
import {
  pushMLDraftBlock,
  pushMLDraftBlockLogo,
  pushMLDraftBlockSocial,
  notNull,
  handleServerNetworkError,
  getValues,
} from 'common/utils/state';
import { normalizeMLDraft } from 'common/utils/state/normalizeMLDraft';
import { nanoid } from 'common/utils/ui/idGeneration/nanoid';
import { authAPI, multilinkAPI } from 'dal';
import { getTemplates } from 'ui/pages/main/multilink/editor/template/templates';

const initialState: TMLDraftState = {
  name: '',
  background: '#fff',
  outerBackground: '#0000',
  maxWidth: 480,
  contentMap: [],
  blocks: {},
  isTouched: false,

  images: {
    background: null,
    outerBackground: null,
    blocks: {
      logoBlocks: [],
      imageBlocks: [],
      imageTextBlocks: [],
      shopBlocks: [],
      buttonBlocks: [],
      carouselBlocks: [],
      linkBlocks: [],
      audioBlocks: [],
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
      state.blocks = {};
      state.isTouched = false;
      const template = action.payload.templates[action.payload.index];
      state.contentMap = template.map((block, i) => {
        const blockId = nanoid();
        state.blocks[`${block.type}_${blockId}`] = template[i];
        return `${block.type}_${blockId}`;
      });
      state.images.background = null;
      state.images.blocks = {
        logoBlocks: template.map((block, i) =>
          block.type === MLContentType.LOGO ? { order: i, logo: null } : null,
        ),
        imageBlocks: template.map((block, i) =>
          block.type === MLContentType.IMAGE ? { order: i, image: null } : null,
        ),
        imageTextBlocks: template.map((block, i) =>
          block.type === MLContentType.IMAGETEXT ? { order: i, image: null } : null,
        ),
        shopBlocks: template.map((block, i) =>
          block.type === MLContentType.SHOP
            ? { order: i, cells: block.cells.map(() => null) }
            : null,
        ),
        /* logoBlocks: template.map((block, i) => null),
        imageBlocks: template.map((block, i) => null),
        imageTextBlocks: template.map((block, i) => null),
        shopBlocks: template.map((block, i) => null), */
        buttonBlocks: template.map((block, i) => null),
        carouselBlocks: template.map((block, i) => null),
        linkBlocks: template.map((block, i) =>
          block.type === MLContentType.LINK ? { order: i, image: null } : null,
        ),
        audioBlocks: template.map((block, i) =>
          block.type === MLContentType.AUDIO ? { order: i, image: null } : null,
        ),
      };
    },

    setMLDraftLogoFromUserAvatar(state, action: PayloadAction<Nullable<TIncomingImage>>) {},

    setMLDraftBackground(
      state,
      action: PayloadAction<{ background: Partial<Record<MLBackgroundType, string>> }>,
    ) {
      Object.assign(state, action.payload.background);
      state.isTouched = true;
    },

    setMLDraftBackgroundImage(state, action: PayloadAction<TImageFile>) {
      state.images = { ...state.images, background: action.payload };
      state.isTouched = true;
      //  при отмене выбора картинки в модалке, нужно сделать false?
    },

    addMLDraftBlock(state, action: PayloadAction<{ type: MLContentType; id: string }>) {
      pushMLDraftBlock(action.payload.type, state.blocks, action.payload.id);
      state.contentMap = [...state.contentMap, `${action.payload.type}_${action.payload.id}`];
      state.isTouched = true;
    },

    addMLDraftBlockLogo(state, action: PayloadAction<Nullable<TIncomingImage>>) {
      const newBlocks = pushMLDraftBlockLogo(state.blocks, state.contentMap.length, action.payload);
      state.contentMap = [...state.contentMap, MLContentType.LOGO];
      state.blocks = newBlocks;
      state.isTouched = true;
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
      state.isTouched = true;
    },

    setMLDraftBlockContent<T extends TMLDraftBlocksUnion>(
      state: TMLDraftState,
      action: PayloadAction<{ content: Partial<T>; id: string; type: MLContentType }>,
    ) {
      const { id, type, content } = action.payload;
      const block = state.blocks[`${type}_${id}`];
      Object.assign(block, content);
      state.blocks = { ...state.blocks };
      state.isTouched = true;
      // При отмене сделать false
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
          | 'audioBlocks'
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
      if (action.payload.imageData) {
        state.isTouched = true;
      }
    },
    setDragBlock(state, action: PayloadAction<{ destinationIndex: number; sourceIndex: number }>) {
      const { destinationIndex, sourceIndex } = action.payload;
      const newContentMap = state.contentMap;
      const add = newContentMap[sourceIndex];
      newContentMap.splice(sourceIndex, 1);

      newContentMap.splice(destinationIndex, 0, add);
      state.contentMap = newContentMap;
    },
    deleteMLDraftBlock(state, action: PayloadAction<{ id: string; type: MLContentType }>) {
      const { id, type } = action.payload;
      const key = `${type}_${id}`;
      const newContentMap = state.contentMap;
      const index = newContentMap.findIndex(content => content === key);
      newContentMap.splice(index, 1);
      state.contentMap = newContentMap;

      delete state.blocks[key];
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
  setDragBlock,
  deleteMLDraftBlock,
  // setMLDraftResetInitialState,
} = mlDraftSlice.actions;
export const mlDraftReducer = mlDraftSlice.reducer;

// thunks

export const publishMultilink = createAsyncThunk(
  'mlDraft/publishMultilink',
  async (multilink: TMultilinkDraft, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(setAppStatus(AppStatus.USERDATA_LOADING));
      const [multilinkDto, imagesDto] = normalizeMLDraft(multilink);
      const response = await multilinkAPI.create(multilinkDto, imagesDto);
      response && dispatch(setAppStatus(AppStatus.SUCCEEDED));
    } catch (e) {
      handleServerNetworkError(e, AppStatus.USERDATA_FAILED, dispatch);
    }
  },
);

export const saveImage = createAsyncThunk(
  'mlDraft/saveImage',
  async (
    {
      imageData,
      id,
      type,
    }: {
      imageData: Record<string, TImageFile>;
      id: string;
      type: MLContentType | MLBackgroundType;
    },
    { dispatch },
  ) => {
    try {
      dispatch(setAppStatus(AppStatus.DATA_SAVING));
      const response = await imageAPI.save(getValues(imageData)[0]);
      if (response) {
        const [key, value] = Object.entries(imageData)[0];
        const url = response.data.image.url as string;

        if (Object.values(MLBackgroundType).includes(type as MLBackgroundType)) {
          dispatch(
            setMLDraftBackground({
              background: { [`${type}`]: `url(${url})` } as Record<MLBackgroundType, string>,
            }),
          );
        }

        if (Object.values(MLContentType).includes(type as MLContentType)) {
          dispatch(setMLDraftBlockContent({ content: imageData, id, type: type as MLContentType }));
        }

        dispatch(setAppStatus(AppStatus.SUCCEEDED));
        console.log(response.data);
      }
    } catch (e) {
      handleServerNetworkError(e, AppStatus.DATA_SAVING_FAILED, dispatch);
    }
  },
);

// types
export type TMLDraftState = {
  name: string;
  background: string;
  outerBackground: string;
  maxWidth: number;
  contentMap: string[];
  blocks: TMLDraftBlocks;
  images: TMLDraftImages;
  // in-app values
  currentStage: MLConstructorStage;
  isTouched: boolean;
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

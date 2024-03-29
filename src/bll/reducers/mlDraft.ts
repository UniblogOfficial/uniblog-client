import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppStatus, MLBackgroundType } from '../../common/constants/index';
import { imageAPI } from '../../dal/image';

import { setAppStatus } from '.';

import { MLConstructorStage, MLContentType } from 'common/constants';
import {
  Nullable,
  TImageFile,
  TIncomingImage,
  TMLDraftBlocks,
  TMLDraftImages,
  TMultilinkDraft,
} from 'common/types/instance';
import { TMLDraftBlocksUnion, TMLSavedDraft } from 'common/types/instance/mlDraft';
import { TMLDraftImagesBlocksUnion } from 'common/types/instance/mlDraft/mlImageContent';
import { getValues, handleServerNetworkError, pushMLDraftBlock } from 'common/utils/state';
import { normalizeMLDraft } from 'common/utils/state/normalizeMLDraft';
import { pushMLDraftImageBlock } from 'common/utils/state/pushMLDraftImagesBlock';
import { nanoid } from 'common/utils/ui/idGeneration/nanoid';
import { multilinkAPI } from 'dal';
import { getTemplates } from 'ui/pages/main/multilink/editor/template/templates';

const initialState: TMLDraftState = {
  name: '',
  background: '#fff',
  outerBackground: '#0000',
  maxWidth: 480,
  contentMap: [],
  savedImages: [],
  blocks: {},
  isTouched: false,

  images: {
    background: null,
    outerBackground: null,
    blocks: {},
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
    setMLCurrentStage(state, action: PayloadAction<number>) {
      state.currentStage = action.payload;
    },

    setMLDraftTemplate(
      state,
      action: PayloadAction<{ templates: ReturnType<typeof getTemplates>; index: number }>,
    ) {
      state.background = '#fff';
      state.outerBackground = '#0000';
      state.maxWidth = 480;
      state.blocks = {};
      state.images.blocks = {};
      state.isTouched = false;
      const template = action.payload.templates[action.payload.index];

      state.contentMap = template.map((block, i) => {
        const blockId = nanoid();
        state.blocks[`${block.type}_${blockId}`] = template[i];

        pushMLDraftImageBlock(block.type, state.images.blocks, blockId);

        return `${block.type}_${blockId}`;
      });
      state.images.background = null;
    },
    setMLDraft(state, action: PayloadAction<TMLSavedDraft>) {
      const { name, background, blocks, outerBackground, maxWidth } = action.payload;
      state.name = name;
      state.background = background;
      state.outerBackground = outerBackground;
      state.maxWidth = maxWidth;
      state.blocks = {};
      state.contentMap = blocks.map((block, i) => {
        const blockId = nanoid();
        state.blocks[`${block.type}_${blockId}`] = block;

        pushMLDraftImageBlock(block.type, state.images.blocks, blockId);

        return `${block.type}_${blockId}`;
      });
      state.images.background = null;
      state.currentStage = MLConstructorStage.CONTENT;
    },

    setMLDraftLogoFromUserAvatar(state, action: PayloadAction<Nullable<TIncomingImage>>) {},

    setMLDraftBackground(
      state,
      action: PayloadAction<{ background: Partial<Record<MLBackgroundType, string>> }>,
    ) {
      Object.assign(state, action.payload.background);
      state.isTouched = true;
    },
    setMLDraftSavedImages(state, action) {
      state.savedImages = action.payload;
    },

    setMLDraftBackgroundImage(state, action: PayloadAction<TImageFile>) {
      state.images = { ...state.images, background: action.payload };
      state.isTouched = true;
      //  при отмене выбора картинки в модалке, нужно сделать false?
    },

    addMLDraftBlock(state, action: PayloadAction<{ type: MLContentType; id: string }>) {
      pushMLDraftBlock(action.payload.type, state.blocks, action.payload.id);
      pushMLDraftImageBlock(action.payload.type, state.images.blocks, action.payload.id);
      state.contentMap = [...state.contentMap, `${action.payload.type}_${action.payload.id}`];
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

    setMLDraftBlockContentImage<T extends TMLDraftImagesBlocksUnion>(
      state: TMLDraftState,
      action: PayloadAction<{
        imageData: Partial<T>;
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
          | 'timerBlocks'
        >;
      }>,
    ) {
      const { imageData, id, field } = action.payload;

      const block = state.images.blocks[`${field}_${id}`];
      Object.assign(block, imageData);
      state.images.blocks = { ...state.images.blocks };

      state.isTouched = true;
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
  setMLDraftBlockContent,
  setMLDraftBlockContentImage,
  setDragBlock,
  deleteMLDraftBlock,
  setMLDraft,
  setMLCurrentStage,
  setMLDraftSavedImages,
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
export const getAllImages = createAsyncThunk(
  'mlDraft/allImages',
  async (_, { dispatch, getState }) => {
    try {
      dispatch(setAppStatus(AppStatus.AUTH_LOADING));
      const res = await imageAPI.all();
      const a: Array<SavedImage> = res.data;
      dispatch(setMLDraftSavedImages(a));
      dispatch(setAppStatus(AppStatus.SUCCEEDED));
    } catch (e) {
      handleServerNetworkError(e, AppStatus.AUTH_FAILED, dispatch);
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
          dispatch(
            setMLDraftBlockContent({
              content: { [`${key}`]: url },
              id,
              type: type as MLContentType,
            }),
          );
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
  savedImages: SavedImage[];
};
type SavedImage = {
  id: number;
  type: string;
  name: string;
  filename: string;
  mime: string;
  url: string;
  thumbUrl: string;
};

export type TMLDraftActions =
  | ReturnType<typeof setMLDraftName>
  | ReturnType<typeof setMLDraftLogoFromUserAvatar>
  | ReturnType<typeof setMLDraftTemplate>
  | ReturnType<typeof setMLDraftBackground>
  | ReturnType<typeof setMLDraftBackgroundImage>
  | ReturnType<typeof addMLDraftBlock>
  | ReturnType<typeof setMLDraftBlockContent>
  | ReturnType<typeof setMLDraftBlockContentImage>;

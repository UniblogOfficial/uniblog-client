import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { batch } from 'react-redux';

import { setAppStatus, setInitialized, setMultilinkMode, requestMe, setUserData } from '.';

import { AppThunk, store } from 'bll/store';
import { AppStatus } from 'common/constants';
import { Nullable, TMultilink } from 'common/types/instance';
import { handleServerNetworkError } from 'common/utils/state/errorHandler';
import { normalizeMLPublic } from 'common/utils/state/normalizeMLPublic';
import { multilinkAPI } from 'dal';

const initialState = {
  multilink: null as null | TMultilink,
  allMultilinks: null as null | TMultilink[],
};

const multilinkSlice = createSlice({
  name: 'multilink',
  initialState,
  reducers: {
    setMultilink(state, action: PayloadAction<TMultilink>) {
      state.multilink = action.payload;
    },
    setAllMultilinks(state, action: PayloadAction<TMultilink[]>) {
      state.allMultilinks = action.payload;
    },
  },
});

export const { setMultilink, setAllMultilinks } = multilinkSlice.actions;

export const multilinkReducer = multilinkSlice.reducer;

export const getMultilink = createAsyncThunk(
  'multilink/getMultilink',
  async (name: string, { dispatch, rejectWithValue, getState }) => {
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
        // @ts-ignore
        dispatch(requestMe());
      }
    } catch (e) {
      handleServerNetworkError(e, AppStatus.CONTENT_FAILED, dispatch);
      // @ts-ignore
      dispatch(requestMe());
    }
  },
);

export const getAllMultilinks = createAsyncThunk(
  'multilink/getAllMultilinks',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(setAppStatus(AppStatus.CONTENT_LOADING));
      const response = await multilinkAPI.getAll();
      if (response.data) {
        console.log(response.data);
        batch(() => {
          dispatch(
            setAllMultilinks(
              response.data.multilinks.map((ml: TMultilink) => normalizeMLPublic(ml)),
            ),
          );
          dispatch(setAppStatus(AppStatus.SUCCEEDED));
        });
      }
    } catch (e) {
      handleServerNetworkError(e, AppStatus.CONTENT_FAILED, dispatch);
    }
  },
);

// types
export type TMultilinkState = {
  multilink: Nullable<TMultilink>;
  allMultilinks: Nullable<TMultilink[]>;
};

export type TMultilinkActions =
  | ReturnType<typeof setMultilink>
  | ReturnType<typeof setAllMultilinks>;

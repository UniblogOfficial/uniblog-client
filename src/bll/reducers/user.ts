import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setAppStatus } from '.';

import { AppThunk } from 'bll/store';
import { AppStatus } from 'common/constants';
import { TImageFile, Nullable, Role, TUser, TIncomingImage } from 'common/types/instance';
import { handleServerNetworkError } from 'common/utils/state';
import { userAPI } from 'dal';

// variables
enum UserActionType {
  SET_USER_DATA = 'SET_USER_DATA',
  REMOVE_USER_DATA = 'REMOVE_USER_DATA',
}

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUserData: () => null,
    // @ts-ignore
    setUserData: (_, action: PayloadAction<TUser>) => action.payload,
  },
});

// export const userReducer = (state: TUserState = initialState, action: TUserActions): TUserState => {
//   switch (action.type) {
//     case UserActionType.SET_USER_DATA:
//       return {
//         ...state,
//         ...action.payload,
//       };
//     case UserActionType.REMOVE_USER_DATA:
//       return null;
//     default:
//       return state;
//   }
// };

// actions
// export const setUserData = (userData: TUser) =>
//   ({ type: UserActionType.SET_USER_DATA, payload: { ...userData } } as const);
// export const removeUserData = () => ({ type: UserActionType.REMOVE_USER_DATA } as const);

export const { removeUserData, setUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;

// thunks
export const requestSaveAvatar =
  (image: TImageFile): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatus(AppStatus.USERDATA_LOADING));
      const response = await userAPI.updateAvatar(image.file);
      dispatch(setUserData(response.data));
      dispatch(setAppStatus(AppStatus.SUCCEEDED));
    } catch (error) {
      handleServerNetworkError(error, AppStatus.USERDATA_FAILED, dispatch);
    }
  };
// types
export type TUserState = Nullable<TUser>;
export type TUserActions = ReturnType<typeof setUserData> | ReturnType<typeof removeUserData>;

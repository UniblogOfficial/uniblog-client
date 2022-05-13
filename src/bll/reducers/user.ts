import { AppStatus } from '../../common/constants';
import { TImageFile } from '../../common/types/instance/image';
import { Nullable } from '../../common/types/instance/index';
import { Role, TAvatar, TUser } from '../../common/types/instance/user';
import { handleServerNetworkError } from '../../common/utils/state';
import { userAPI } from '../../dal/user';
import { AppThunk } from '../store';

import { setAppStatus } from './app';
// variables
enum UserActionType {
  SET_USER_DATA = 'SET_USER_DATA',
  REMOVE_USER_DATA = 'REMOVE_USER_DATA',
}

const initialState = null;

export const userReducer = (state: TUserState = initialState, action: TUserActions): TUserState => {
  switch (action.type) {
    case UserActionType.SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case UserActionType.REMOVE_USER_DATA:
      return null;
    default:
      return state;
  }
};

// actions
export const setUserData = (userData: TUser) =>
  ({ type: UserActionType.SET_USER_DATA, payload: { ...userData } } as const);
export const removeUserData = () => ({ type: UserActionType.REMOVE_USER_DATA } as const);

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

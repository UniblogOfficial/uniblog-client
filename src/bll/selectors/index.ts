import { TState } from 'bll/store';
import { MLContentType } from 'common/constants';
import { IMLDraftMap, MLDraftMap, Nullable } from 'common/types/instance';

export const selectAppStatus = (state: TState) => state.app.status;
export const selectUserData = (state: TState) => state.user;
export const selectPositionMark = (state: TState, id: string, type: MLContentType) =>
  state.mlDraft.blocks[`${type}_${id}`] as MLDraftMap;

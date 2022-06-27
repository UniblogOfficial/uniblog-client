import { TState } from 'bll/store';
import { IMLDraftMap, Nullable } from 'common/types/instance';

export const selectAppStatus = (state: TState) => state.app.status;
export const selectUserData = (state: TState) => state.user;
export const selectPositionMark = (state: TState, order: number): Nullable<IMLDraftMap> =>
  state.mlDraft.blocks.mapBlocks.filter(block => block && block.order === order)[0];

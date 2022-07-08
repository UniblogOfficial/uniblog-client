import { TState } from 'bll/store';
import { TMLDraftBlocks, TMLDraftImages } from 'common/types/instance';

export const selectMlDraftName = (state: TState): string => state.mlDraft.name;
export const selectMlDraftMaxWidth = (state: TState): number => state.mlDraft.maxWidth;
export const selectMlDraftBlocks = (state: TState): TMLDraftBlocks => state.mlDraft.blocks;
export const selectMlDraftImages = (state: TState): TMLDraftImages => state.mlDraft.images;
export const selectMlDraftBackground = (state: TState): string => state.mlDraft.background;
export const selectMlDraftContentMap = (state: TState): string[] => state.mlDraft.contentMap;

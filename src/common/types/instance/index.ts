export type Nullable<T> = T | null;
export type Modify<T, R> = Omit<T, keyof R> & R; // exm: {a: number, b: string} as T => {b: string} as OmittedT & {a: Object } as R

export type { TUser, Role } from './user';
export type { TImageFile, TIncomingImage } from './image';
export type {
  IMLDraftText,
  IMLDraftLink,
  IMLDraftLogo,
  IMLDraftSocial,
  IMLDraftImage,
  IMLDraftImageText,
  IMLDraftVideo,
  IMLDraftShop,
  IMLDraftAudio,
  IMLDraftButton,
  IMLDraftCarousel,
  IMLDraftDivider,
  IMLDraftMap,
  IMLDraftPost,
  IMLDraftVote,
  IMLDraftWidget,
  IMLDraftTimer,
  //
  TMLImageContentLogo,
  TMLImageContentImage,
  TMLImageContentImageText,
  TMLImageContentShop,
  TMLImageContentButton,
  TMLImageContentCarousel,
  TMLImageContentLink,
  TMLImageContentAudio,
  //
  TMultilinkDraft,
  TMLDraftBlocks,
  TMLDraftImages,
  TMLDraftBlocksUnion,
} from './mlDraft';
export {
  MLDraftAudio,
  MLDraftBlock,
  MLDraftButton,
  MLDraftCarousel,
  MLDraftDivider,
  MLDraftImage,
  MLDraftImageText,
  MLDraftLink,
  MLDraftLogo,
  MLDraftMap,
  MLDraftPost,
  MLDraftShop,
  MLDraftSocial,
  MLDraftText,
  MLDraftVideo,
  MLDraftVote,
  MLDraftWidget,
  MLDraftTimer,
} from './mlDraft';
export type { TMultilinkComplete } from './mlComplete';
export type { TMultilink } from './mlPublic';

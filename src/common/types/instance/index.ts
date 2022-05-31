export type Nullable<T> = T | null;
export type Modify<T, R> = Omit<T, keyof R> & R; // exm: {a: number, b: string} as T => {b: string} as OmittedT & {a: Object } as R

export type { TUser } from './user';
export type { TImageFile, TIncomingImage } from './image';
export type {
  TMultilinkDraft,
  TMLDraftBlocks,
  TMLDraftImages,
  IMLDraftContentText,
  IMLDraftContentLink,
  IMLDraftContentLogo,
  IMLDraftContentSocial,
  IMLDraftContentImage,
  IMLDraftContentImageText,
  IMLDraftContentVideo,
  IMLDraftContentShop,
  IMLDraftContentUnknown,
  TMLImageContentLogo,
  TMLImageContentImage,
  TMLImageContentImageText,
  TMLImageContentShop,
} from './mlDraft';
export type { TMultilinkComplete } from './mlComplete';
export type { TMultilink } from './mlPublic';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* interface IEl {
  index: number;
  type: string;
}

interface IA extends IEl {
  a: string;
}

interface IB extends IEl {
  b: string;
}

interface IC extends IEl {
  c: string;
}

const a0: IA = {
  index: 0,
  type: 'a',
  a: 'a',
};
const b1: IB = {
  index: 1,
  type: 'b',
  b: 'b',
};
const c2: IC = {
  index: 2,
  type: 'c',
  c: 'c',
};
const b3: IB = {
  index: 4,
  type: 'b',
  b: 'b',
};

type TArrElement = IA | IB | IC;

const arr: TArrElement[] = [a0, b1, c2, b3, a0];
arr[0].index */
//
//
//
//
//
//
//
//
//
//
/* const strArr = ['a', 'b', 'c', 'b']; // as Enum ElementType[]
const aArr = ['a', null, null, null]; // as (IA | null)[]
const bArr = [null, 'b', null, 'b']; // as (IB | null)[]
const cArr = [null, null, 'c', null]; // as (IC | null)[]

[
  [{}: TypeA: {} TypeKeyA],
  [{}: TypeB: {} TypeKeyB],
] */

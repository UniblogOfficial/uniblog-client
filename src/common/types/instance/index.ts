export type Nullable<T> = T | null;
export type Modify<T, R> = Omit<T, keyof R> & R; // exm: {a: number, b: string} as T => {b: string} as OmittedT & {a: Object } as R

export type { TMLContent } from './multilink';

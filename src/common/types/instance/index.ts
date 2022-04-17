export type Nullable<T> = T | null;
export type Modify<T, R> = Omit<T, keyof R> & R; // {a: number, b: string} => {a: string, b: string}

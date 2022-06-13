// variables
enum xpostActionType {
  SET_TEXT = 'SET_TEXT',
}

const initialState: TXpostState = {
  text: '',
};

export const xpostReducer = (state: TXpostState = initialState, action: any) => state;

// actions
export const setXpostText = (text: string) =>
  ({ type: xpostActionType.SET_TEXT, payload: { text } } as const);

// types
export type TXpostState = {
  text: string;
};

export type TXpostAction = ReturnType<typeof setXpostText>;

// variables
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum xpostActionType {
  SET_TEXT = 'SET_TEXT',
}

const initialState: TXpostState = {
  text: '',
};

// export const xpostReducer = (state: TXpostState = initialState, action: any) => state;

const xpostSlice = createSlice({
  name: 'xpost',
  initialState,
  reducers: {
    setXpostText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
  },
});

export const { setXpostText } = xpostSlice.actions;
export const xpostReducer = xpostSlice.reducer;

// actions
// export const setXpostText = (text: string) =>
//   ({ type: xpostActionType.SET_TEXT, payload: { text } } as const);

// types
export type TXpostState = {
  text: string;
};

export type TXpostAction = ReturnType<typeof setXpostText>;

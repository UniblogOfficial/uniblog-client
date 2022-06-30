// variables
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TXpostState = {
  text: '',
};

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

// types
export type TXpostState = {
  text: string;
};

export type TXpostAction = ReturnType<typeof setXpostText>;

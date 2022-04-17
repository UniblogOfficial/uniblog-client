import { TState } from '../store';

export const selectAppStatus = (state: TState) => state.app.status;

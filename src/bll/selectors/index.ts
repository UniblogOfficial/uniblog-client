import { TState } from '../store';

export const selectAppStatus = (state: TState) => state.app.status;
export const selectUserData = (state: TState) => state.auth.userData;

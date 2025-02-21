import { ActionReducerMap } from '@ngrx/store';
import { pigReducer, PigState } from './pig.reducer';

export interface AppState {
  pig: PigState;
}

export const reducers: ActionReducerMap<AppState> = {
  pig: pigReducer
};

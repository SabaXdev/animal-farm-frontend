import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PigState } from './pig.reducer';

export const selectPigState = createFeatureSelector<PigState>('pig');

export const selectPig = createSelector(selectPigState, (state: PigState) => state.pig);
export const selectPigStatus = createSelector(selectPigState, (state: PigState) => state.status);
export const selectPigError = createSelector(selectPigState, (state: PigState) => state.error);

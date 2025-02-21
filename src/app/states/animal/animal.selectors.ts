import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnimalState } from './animal.reducer';

export const selectAnimalState = createFeatureSelector<AnimalState>('animals');

export const selectAllAnimals = createSelector(
  selectAnimalState,
  (state: AnimalState) => state.animals
);

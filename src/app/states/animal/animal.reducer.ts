import { createReducer, on } from '@ngrx/store';
import { Animal } from '../../features/animals/animal.model';
import { loadAnimalsSuccess, feedAnimalSuccess } from './animal.actions';

export interface AnimalState {
  animals: Animal[];
}

const initialState: AnimalState = {
  animals: []
};

export const animalReducer = createReducer(
  initialState,
  on(loadAnimalsSuccess, (state, { animals }) => (
    { 
      ...state, 
      animals 
    }
    )
),
  on(feedAnimalSuccess, (state, { id, pigState }) => ({
    ...state,
    animals: state.animals.map(
      animal => animal._id === id ? { ...animal, thanks: animal.thanks + 1 } : animal
    ),
    pigStatus: pigState
  }))
);

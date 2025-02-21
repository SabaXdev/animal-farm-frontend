import { createAction, props } from '@ngrx/store';
import { Animal } from '../../features/animals/animal.model';

export const loadAnimals = createAction('[Animal] Load Animals');
export const loadAnimalsSuccess = createAction('[Animal] Load Animals Success', props<{ animals: Animal[] }>());
export const loadAnimalsFailure = createAction('[Animal] Load Animals Failure', props<{ error: string }>());

export const feedAnimal = createAction('[Animal] Feed Animal', props<{ id: string }>());
export const feedAnimalSuccess = createAction('[Animal] Feed Animal Success', props<{ id: string, pigState: string }>());
export const feedAnimalFailure = createAction('[Animal] Feed Animal Failure', props<{ error: string }>());

import { createAction, props } from "@ngrx/store"
import { Pig } from "../../features/pig/pig.model";

export const loadPig = createAction('[Pig] Load Pig');
export const loadPigSuccess = createAction('[Pig] Load Pig Success', props<{ pig: Pig }>());
export const loadPigFailure = createAction('[Pig] Load Pig Failure', props<{ error: string }>());

export const loadPigStatus = createAction('[Pig] Load Pig Status');
export const loadPigStatusSuccess = createAction('[Pig] Load Pig Status Success', props<{ status: string }>());
export const loadPigStatusFailure = createAction('[Pig] Load Pig Status Failure', props<{ error: string }>());

// Action to manually change pig state
export const updatePigState = createAction('[Pig] Update Pig State', props<{ status: 'neutral' | 'happy' | 'putin' }>());

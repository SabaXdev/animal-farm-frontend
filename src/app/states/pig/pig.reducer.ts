import { createReducer, on } from '@ngrx/store';
import { Pig } from '../../features/pig/pig.model';
import {
  loadPig,
  loadPigSuccess,
  loadPigFailure,
  loadPigStatus,
  loadPigStatusSuccess,
  loadPigStatusFailure,
  updatePigState
} from './pig.actions';

export interface PigState {
  pig: Pig | null;
  error: string | null;
  status: 'neutral' | 'happy' | 'putin';
}

export const initialState: PigState = {
  pig: null,
  error: null,
  status: 'neutral'
};

export const pigReducer = createReducer(
  initialState,
  on(loadPig, state => ({ ...state, error: null})),
  on(loadPigSuccess, (state, { pig }) => ({ ...state, pig, error: null})),
  on(loadPigFailure, (state, { error }) => ({ ...state, error })),
  on(loadPigStatus, state => ({ ...state, error: null })),
  on(loadPigStatusSuccess, (state, { status }) => ({ ...state, status: status as "neutral" | "happy" | "putin" })),
  on(loadPigStatusFailure, (state, { error }) => ({ ...state, error })),
  on(updatePigState, (state, { status: newStatus }) => {
    return {
      ...state,
      status: newStatus,
      pig: state.pig
        ? {
            ...state.pig,
            imageUrl:
              newStatus === 'happy'
                ? 'assets/images/ღორი_გახარებული.jpg'
                : newStatus === 'putin'
                ? 'assets/images/პუტინი.png'
                : 'assets/images/ღორი_ჩვეულებრივი.jpg',
          }
        : null,
    };
  })
);

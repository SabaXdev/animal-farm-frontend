import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PigService } from '../../features/pig/pig.service';
import {
  loadPig,
  loadPigSuccess,
  loadPigFailure,
  loadPigStatus,
  loadPigStatusSuccess,
  loadPigStatusFailure
} from './pig.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PigEffects {
  private actions$ = inject(Actions);
  private pigService = inject(PigService);

  loadPig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPig),
      mergeMap(() =>
        this.pigService.getPig().pipe(
          map(pig => (pig ? loadPigSuccess({ pig }) : loadPigFailure({ error: 'Pig not found' }))),
          catchError(error => of(loadPigFailure({ error: error.message })))
        )
      )
    )
  });

  loadPigStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPigStatus),
      mergeMap(() =>
        this.pigService.getPigStatus().pipe(
          map(response => loadPigStatusSuccess({ status: response.state  as 'neutral' | 'happy' | 'putin'})),
          catchError(error => {
            console.error("❌ Error loading Pig Status:", error.message); // Log errors
            return of(loadPigStatusFailure({ error: error.message }));
          })
        )
      )
    );
  });

}

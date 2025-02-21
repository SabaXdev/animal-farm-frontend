import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AnimalsService } from '../../features/animals/animals.service';
import { loadAnimals, loadAnimalsSuccess, feedAnimal, feedAnimalSuccess, loadAnimalsFailure, feedAnimalFailure } from './animal.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AnimalEffects {
  private actions$ = inject(Actions);
  private animalsService = inject(AnimalsService);

  loadAnimals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAnimals),
      mergeMap(() =>
        this.animalsService.getAnimals().pipe(
          map(animals => loadAnimalsSuccess({ animals })),
          catchError(error => of(loadAnimalsFailure({ error: error.message })))
        )
      )
    )
  });

  feedAnimal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(feedAnimal),
      mergeMap(({ id }) =>
        this.animalsService.feedAnimal(id).pipe(
          map(data => feedAnimalSuccess({ id, pigState: data.pigState })),
          catchError(error => of(feedAnimalFailure({ error: error.message })))
        )
      )
    )
  });
}

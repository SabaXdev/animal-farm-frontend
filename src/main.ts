import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AnimalsComponent } from './app/features/animals/animals.component';
import { provideStore } from '@ngrx/store';
import { animalReducer } from './app/states/animal/animal.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { AnimalEffects } from './app/states/animal/animal.effects';
import { pigReducer } from './app/states/pig/pig.reducer';
import { PigEffects } from './app/states/pig/pig.effects';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore({ 
      animals: animalReducer, pig: pigReducer 
    }),
    provideEffects(AnimalEffects, PigEffects)
  ],
}).catch(err => console.log(err));

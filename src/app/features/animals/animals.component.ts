import { Component } from '@angular/core';
import { AnimalsService } from './animals.service';
import { Animal } from './animal.model';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PigComponent } from '../pig/pig.component';
import { AnimalStateService } from './animal-state.service';
import { loadAnimals, feedAnimal } from '../../states/animal/animal.actions';
import { selectAllAnimals } from '../../states/animal/animal.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadPigStatus } from '../../states/pig/pig.actions';

@Component({
  selector: 'app-animals',
  imports: [ MatButtonModule, CommonModule, NgFor, PigComponent],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.scss',
})
export class AnimalsComponent {
  animals$: Observable<Animal[]>;
  isThanking: { [key: string]: boolean } = {};

  constructor(
    private store: Store,
    private animalsService: AnimalsService,
    private animalStateService: AnimalStateService
  ) {
    this.animals$ = this.store.select(selectAllAnimals);
  }

  ngOnInit() {
    this.store.dispatch(loadAnimals());
  }

  feedAnimal(id: string, name: string) {
    this.isThanking[id] = true;

    this.animalsService.feedAnimal(id).subscribe((data) => {
      this.store.dispatch(loadAnimals());
      this.store.dispatch(loadPigStatus());

      if (data.pigState == "happy") {
        this.animalStateService.updatePigStatus('happy');
      } else {
        this.animalStateService.updatePigStatus('neutral');
      }
    });
    
    this.animalStateService.triggerThankYou(name);
    // Reset animation after 3 seconds
    setTimeout(() => {
      this.isThanking[id] = false;
      this.store.dispatch(loadPigStatus());
    }, 3000);
  }
}

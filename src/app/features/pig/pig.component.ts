import { Component } from '@angular/core';
import { Pig } from './pig.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule} from '@angular/common';
import { AnimalStateService } from '../animals/animal-state.service';
import { filter, interval, Observable, switchMap } from 'rxjs';
import { MusicService } from '../music/music.service';
import { select, Store } from '@ngrx/store';
import { selectPig, selectPigStatus } from '../../states/pig/pig.selector';
import { loadPig, loadPigStatus, updatePigState } from '../../states/pig/pig.actions';
import { PigState } from '../../states/pig/pig.reducer';

@Component({
  selector: 'app-pig',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './pig.component.html',
  styleUrl: './pig.component.scss'
})
export class PigComponent {
  pig$: Observable<Pig | null>;
  pigStatus$: Observable<'neutral' | 'happy' | 'putin'>;

  isRotated = false;
  isMusicPlaying = false;
  manualOverride = false;
  audio = new Audio();

  constructor(
    private store: Store<{ pig: PigState }>,
    private musicService: MusicService,
  ) {
    this.pig$ = this.store.select(selectPig);
    this.pigStatus$ = this.store.select(selectPigStatus);
  }

  ngOnInit() {
    this.store.dispatch(loadPig());
    this.store.dispatch(loadPigStatus());

    this.pigStatus$ = this.store.pipe(select(selectPigStatus));
    this.pig$ = this.store.select(selectPig);

    this.pigStatus$.pipe(
      filter(status => !!status)
    ).subscribe((status) => {
      if (!this.manualOverride) {
        this.store.dispatch(updatePigState({ status: status as 'neutral' | 'happy' | 'putin' }));
      }
    });
  }

  togglePigState() {
    this.isRotated = !this.isRotated;
    this.manualOverride = true;
    
    const newState: 'neutral' | 'happy' | 'putin' = this.isRotated ? 'putin' : 'neutral';

    this.store.dispatch(updatePigState({ status: newState }));

    if (this.isMusicPlaying) {
      this.toggleMusic();
    }
  }

  toggleMusic() {
    this.musicService.toggleMusic().subscribe((response) => {
      this.isMusicPlaying = response.isPlaying;
      this.audio.src = this.isRotated
        ? 'რუსეთის_ჰიმნი.mp3'
        : 'ჩემი_საქართველო_აქ_არის.mp3';
      this.isMusicPlaying ? this.audio.play() : this.audio.pause();
    });
  }
}

import { Component } from '@angular/core';
import { AnimalsComponent } from './features/animals/animals.component';

@Component({
  selector: 'app-root',
  imports: [AnimalsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'animal-farm-frontend';
}

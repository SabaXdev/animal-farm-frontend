import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  // private apiUrl = 'http://localhost:3000/api/music/toggle';
    private apiUrl = environment.apiUrl + '/api/music/toggle';

  constructor(private http: HttpClient) {}

  toggleMusic(): Observable<{ isPlaying: boolean; message: string }> {
    return this.http.post<{ isPlaying: boolean; message: string }>(this.apiUrl, {});
  }
}

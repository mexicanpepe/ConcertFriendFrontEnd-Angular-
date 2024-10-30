import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist.model'
import { Concert } from '../models/concert.model';
import { NewConcert } from '../models/NewConcert.model';

@Injectable({
  providedIn: 'root',
})
export class ConcertFriendService {
  private apiUrl = 'http://localhost:5001';

  constructor(private http: HttpClient) {}

    // Get all artists
    getArtists(): Observable<Artist[]> {
      return this.http.get<Artist[]>(`${this.apiUrl}/artists`);
    }

    //get all artists
    getConcerts(): Observable<Concert[]> {
      return this.http.get<Concert[]>(`${this.apiUrl}/concerts`);
    }

  // single concert by ID
  getConcertById(id: number): Observable<Concert[]> {
    return this.http.get<Concert[]>(`${this.apiUrl}/concerts/${id}`);
  }

  // Update an existing concert
  updateConcert(concert: Concert): Observable<any> {
    return this.http.put(`${this.apiUrl}/concerts/${concert.concert_id}`, concert);
  }

    // Add a new concert (using NewConcert type)
    addConcert(concert: NewConcert): Observable<any> {
      return this.http.post(`${this.apiUrl}/concerts`, concert);
    }

    //Delete a concert by its ID
  deleteConcert(concertId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/concerts/${concertId}`);
  }
}

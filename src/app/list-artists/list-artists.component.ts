import { Component, OnInit } from '@angular/core';
import { ConcertFriendService } from '../../service/concert-friend.service';
import { Artist } from '../../models/artist.model';
import { CommonModule } from '@angular/common';
import { NgIf, NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-artists',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf],
  templateUrl: './list-artists.component.html',
  styleUrls: ['./list-artists.component.css']
})
export class ListArtistsComponent implements OnInit {
  artists: Artist[] = [];

  constructor(
    private concertFriendService: ConcertFriendService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.concertFriendService.getArtists().subscribe(
      (artists: Artist[]) => {
        this.artists = artists;
        console.log('Artists loaded:', this.artists);
      },
      (error) => {
        console.error('Error fetching artists:', error);
      }
    );
  }

  addConcertForArtist(artistId: number): void {
    this.router.navigate(['/create-concert'], { queryParams: { artistId } });
  }
}

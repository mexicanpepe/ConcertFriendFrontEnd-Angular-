import { Component, OnInit } from '@angular/core';
import { ConcertFriendService } from '../../service/concert-friend.service';
import { Concert } from '../../models/concert.model';
import { CommonModule } from '@angular/common';
import { NgIf, NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-concerts',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, RouterModule],
  templateUrl: './list-concerts.component.html',
  styleUrls: ['./list-concerts.component.css']
})
export class ListConcertsComponent implements OnInit {
  concerts: Concert[] = [];

  constructor(private concertFriendService: ConcertFriendService) {}

  ngOnInit(): void {
    this.concertFriendService.getConcerts().subscribe(
      (concerts: Concert[]) => {
        this.concerts = concerts;
        console.log('Concerts loaded:', this.concerts);
      },
      (error) => {
        console.error('Error fetching concerts:', error);
      }
    );
  }

    // Delete a concert after confirmation
    deleteConcert(concertId: number): void {
      if (confirm('Are you sure you want to delete this concert?')) {
        this.concertFriendService.deleteConcert(concertId).subscribe(
          () => {
            alert('Concert deleted successfully');
          },
          (error) => {
            console.error('Error deleting concert:', error);
          }
        );
      }
  }

}
